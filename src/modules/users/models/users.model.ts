import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Role } from '../../roles/roles.model';
import { UserRoles } from './user-role.model';

interface UserCreationAttrs {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
  age: number;
}

//Add Migration       sequelize-cli migration:create --name users

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '1234567890', description: 'Password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  @Column({ type: DataType.STRING, allowNull: false })
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @Column({ type: DataType.STRING, allowNull: false })
  last_name: string;

  @ApiProperty({ example: '+380123456789', description: 'Phone number' })
  @Column({ type: DataType.STRING, allowNull: true })
  phone: string;

  @ApiProperty({ example: '18', description: 'Age' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  age: number;

  @ApiProperty({
    example: 'https://profile-image',
    description: 'User profile image',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  image_url: string;

  @ApiProperty({ example: 'EMask', description: 'User tag' })
  @Column({ type: DataType.STRING, unique: true, allowNull: true })
  user_name: string;

  @BelongsToMany(() => Role, () => UserRoles)
  role: Role;
}
