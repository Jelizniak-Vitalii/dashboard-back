import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from '../auth/auth.module';
import { UsersController } from './users.controller';
import { User, UserRoles } from './models';
import { UsersService } from './users.service';
import { FileUploadService, Logger } from '../../shared/services';
import { Role } from '../roles/roles.model';
import { RolesModule } from '../roles/roles.module';

@Module({
  providers: [UsersService, FileUploadService, Logger],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    AuthModule,
    RolesModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
