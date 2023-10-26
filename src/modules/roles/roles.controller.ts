import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RolesService } from './roles.service';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiResponse({ status: 200, type: [Role] })
  @ApiOperation({ summary: 'Get role by value' })
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }

  @ApiResponse({ status: 200, type: [Role] })
  @ApiOperation({ summary: 'Get all roles' })
  @Get('/roles')
  getAll() {
    return this.rolesService.getAll();
  }

  @ApiResponse({ status: 200, type: [Role] })
  @ApiOperation({ summary: 'Create role' })
  @Post('/create')
  create(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto);
  }
}
