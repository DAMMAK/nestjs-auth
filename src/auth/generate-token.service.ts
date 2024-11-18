import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtToken } from './interfaces/jwt-token.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GenerateTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signToken(userId: string, username: string): Promise<JwtToken> {
    const payload = {
      userId,
      username,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.getOrThrow(
          'JWT_REFRESH_TOKEN_EXPIRES_IN',
        ),
      }),
    ]);
    return <JwtToken>{
      accessToken,
      refreshToken,
    };
  }
}
