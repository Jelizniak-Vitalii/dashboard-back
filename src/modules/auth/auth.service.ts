import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users';
import { Logger } from '../../shared/services';
import { User } from '../users/models';
import { checkIsPasswordValid, hashPassword } from '../../shared/helpers';
import { UserRegistrationDto, UserLoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  async login(userDto: UserLoginDto) {
    const user = await this.validateUser(userDto);

    this.logger.log(`User ${user.email} was logged in`);
    return this.generateToken(user);
  }

  async registration({
    first_name,
    last_name,
    phone,
    password,
    email,
  }: UserRegistrationDto) {
    const candidate = await this.usersService.getUserByEmail(email);

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.usersService.createUser({
      first_name,
      last_name,
      email,
      password: await hashPassword(password),
      phone,
    });

    this.logger.log(`User ${user.email} was created`);
    return this.generateToken(user);
  }

  private async validateUser(userDto: UserLoginDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);

    if (user) {
      const passwordEquals = await checkIsPasswordValid(
        userDto.password,
        user.password,
      );

      if (user && passwordEquals) {
        return user;
      }
    }

    throw new HttpException(
      'Некорректный email или пароль',
      HttpStatus.UNAUTHORIZED,
    );
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
