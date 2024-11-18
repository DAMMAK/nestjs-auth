import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './session.serializer';
import { GenerateTokenService } from './generate-token.service';
import { jwtConfig } from 'src/config/jwt.config';
import { JwtRefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ...jwtConfig],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    SessionSerializer,
    GenerateTokenService,
  ],
})
export class AuthModule {}
