import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UserRegistrationDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString({ message: 'Must be string' })
  readonly email: string;

  @IsString({ message: 'Must be string' })
  @Length(4, 8, { message: 'Password must be between 4 and 8 characters' })
  readonly password: string;

  @IsString({ message: 'Must be string' })
  readonly first_name: string;

  @IsString({ message: 'Must be string' })
  readonly last_name: string;

  @IsOptional()
  @IsString({ message: 'Must be string' })
  readonly phone: string;
}
