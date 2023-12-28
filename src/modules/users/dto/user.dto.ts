import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserDto {
  @IsOptional()
  id: number;

  @IsEmail()
  @IsNotEmpty()
  @IsString({ message: 'Email must be in string format' })
  readonly email: string;

  @ValidateIf((object, value) => value)
  @IsString({ message: 'Password must be in string format' })
  @Length(4, 8, { message: 'Password must be between 4 and 8 characters' })
  @IsOptional()
  readonly password: string;

  @IsNotEmpty()
  @IsString({ message: 'Must be string' })
  readonly first_name: string;

  @IsNotEmpty()
  @IsString({ message: 'Must be string' })
  readonly last_name: string;

  @IsOptional()
  @IsString({ message: 'Phone must be in string format' })
  readonly phone: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  @IsNumberString()
  readonly age: number;

  @IsOptional()
  user_name: string;

  @IsOptional()
  @IsNumber()
  role: number;
}
