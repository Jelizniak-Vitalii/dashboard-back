import { IsString, Length } from 'class-validator';

export class UserLoginDto {
  @IsString({ message: 'Must be string' })
  readonly email: string;

  @IsString({ message: 'Must be string' })
  @Length(4, 8, { message: 'Must be between 4 and 8 characters' })
  readonly password: string;
}
