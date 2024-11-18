import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

export const jwtConfig = [
  PassportModule.register({}),
  JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
      secret: configService.getOrThrow('JWT_ACCESS_SECRET'),
      signOptions: {
        expiresIn: '5m',
        algorithm: 'HS384',
      },
      verifyOptions: {
        algorithms: ['HS384'],
      },
    }),
    inject: [ConfigService],
  }),
];
