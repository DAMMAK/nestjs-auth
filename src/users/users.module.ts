import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { GenerateTokenService } from 'src/auth/generate-token.service';
import { ConfigModule } from '@nestjs/config';

import { jwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({ isGlobal: true }),
    ...jwtConfig,
  ],
  controllers: [UsersController],
  providers: [UsersService, GenerateTokenService],
})
export class UsersModule {}
