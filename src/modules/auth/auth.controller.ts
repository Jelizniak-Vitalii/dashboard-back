import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UserLoginDto, UserRegistrationDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() userDto: UserLoginDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  async registration(@Body() userDto: UserRegistrationDto) {
    return this.authService.registration(userDto);
  }
}
