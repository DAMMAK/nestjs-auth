import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Throttle } from '@nestjs/throttler';
import { AuthGuard } from '@nestjs/passport';
import JwtRefreshGuard from './guards/refresh-auth.guard';
import { AuthUser } from '../users/decorators/user.decorator';
import { UserResponse } from '../users/interfaces/users.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ short: { limit: 2, ttl: 1000 }, long: { limit: 5, ttl: 60000 } })
  @Post('login')
  // @UseGuards(LocalAuthGuard)
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  async login(@AuthUser() user: UserResponse): Promise<UserResponse> {
    return user;
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async me(@AuthUser() user: UserResponse): Promise<UserResponse> {
    return user;
  }
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Request() req) {
    this.authService.refreshToken(req.user);
  }
}
