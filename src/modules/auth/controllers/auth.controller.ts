import {
  Body,
  Controller,
  HttpException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthUserType } from '../types/auth.type';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() credentials: AuthUserType) {
    try {
      const result = await this.authService.validateUser(credentials);

      const access_token = await this.authService.login(result);

      return access_token;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/me')
  async me(@Request() req: any) {
    return req.user;
  }
}
