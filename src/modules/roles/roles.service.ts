import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';

import { Role } from './roles.model';
import { Logger } from '../../shared/services';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private roleRepository: typeof Role,
    private logger: Logger,
  ) {}

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    this.logger.log(`RolesService.getRoleByValue: ${JSON.stringify(role)}`);

    return role;
  }

  async getAll() {
    const roles = await this.roleRepository.findAll();
    this.logger.log(`RolesService.getAll: ${JSON.stringify(roles)}`);

    return roles;
  }

  async createRole(role: CreateRoleDto) {
    return role;
  }
}
