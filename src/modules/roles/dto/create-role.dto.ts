import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  // @ApiProperty({ example: '1', description: 'Unique id user role' })
  // readonly role_id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Unique role value' })
  readonly value: string;

  @ApiProperty({ example: 'Administrator', description: 'Description role' })
  readonly description: string;
}
