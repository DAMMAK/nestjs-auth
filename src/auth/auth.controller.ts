import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Request,
  Body,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthUser } from 'src/users/decorators/user.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Throttle } from '@nestjs/throttler';
import { LoginDto } from './dto/login.dto';
import { UserResponse } from 'src/users/interfaces/users.interface';
import { AuthGuard } from '@nestjs/passport';
import JwtRefreshGuard from './guards/refresh-auth.guard';

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
