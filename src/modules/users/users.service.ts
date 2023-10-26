import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './models';
import { UserDto } from './dto';
import { FileUploadService, Logger } from '../../shared/services';
import { RolesService } from '../roles/roles.service';
import { UserRegistrationDto } from '../auth/dto';

@Injectable()
export class UsersService {
  private bucketName = 'dashboard---images/users';

  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private logger: Logger,
    private roleService: RolesService,
    private fileUploadService: FileUploadService,
  ) {}

  async createUser(dto: UserRegistrationDto) {
    const user = await this.userRepository.create(dto);
    // const role = await this.roleService.getRoleByValue('ADMIN');
    // await user.$set('roles', [role.id]);
    // user.roles = [role];

    this.logger.log(`UsersService.createUser: ${JSON.stringify(user)}`);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });

    this.logger.log(`UsersService.getUserByEmail: ${JSON.stringify(user)}`);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      include: { all: true },
      attributes: { exclude: ['password'] },
    });
    this.logger.log(`UsersService.getAllUsers: ${JSON.stringify(users)}`);

    return users;
  }

  async getUserById(id: number | string) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      this.logger.log(`UsersService.getUserById: User with id ${id} not found`);
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.logger.log(`UsersService.getUserById: ${JSON.stringify(user)}`);

    return user;
  }

  async updateUser(id: number, dto: UserDto) {
    const updateFields = {
      first_name: dto.first_name,
      last_name: dto.last_name,
      phone: dto.phone,
      age: dto.age,
      email: dto.email,
      user_name: dto.user_name,
    };

    await this.getUserById(id);

    const [affectedCount, [updatedUser]] = await this.userRepository.update(
      updateFields,
      {
        where: { id },
        returning: true,
      },
    );
    const user = updatedUser.toJSON();
    delete user.password;

    return user;
  }

  async deleteUser(id: number | string) {
    const user = await this.userRepository.destroy({
      where: { id },
    });
    this.logger.log(`UsersService.deleteUser: ${JSON.stringify(user)}`);

    return user;
  }

  async uploadUserImage(
    file: Express.Multer.File,
    id: string,
  ): Promise<string> {
    const isUserExist = await this.getUserById(id);

    const userImageLink = await this.fileUploadService
      .uploadFileToS3(file, this.bucketName)
      .then((response) => response.Location);

    if (isUserExist.image_url) {
      await this.fileUploadService.deleteFileFromS3(
        this.bucketName,
        isUserExist.image_url,
      );
    }

    await this.userRepository.update(
      { image_url: userImageLink },
      { where: { id } },
    );

    return userImageLink;
  }
}
