import { Test, TestingModule } from '@nestjs/testing';
import { GenerateTokenService } from './generate-token.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('GenerateTokenService', () => {
  let service: GenerateTokenService;
  let jwtService: JwtService;
  let configService: ConfigService;

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  const mockConfigService = {
    getOrThrow: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenerateTokenService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<GenerateTokenService>(GenerateTokenService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signToken', () => {
    it('should generate access and refresh tokens', async () => {
      const userId = '123';
      const username = 'testuser';
      const mockAccessToken = 'mock-access-token';
      const mockRefreshToken = 'mock-refresh-token';

      mockJwtService.signAsync.mockImplementation((payload, options) => {
        if (options?.secret) {
          return Promise.resolve(mockRefreshToken);
        }
        return Promise.resolve(mockAccessToken);
      });

      mockConfigService.getOrThrow.mockImplementation((key) => {
        switch (key) {
          case 'JWT_REFRESH_SECRET':
            return 'refresh-secret';
          case 'JWT_REFRESH_TOKEN_EXPIRES_IN':
            return '7d';
          default:
            return null;
        }
      });

      const result = await service.signToken(userId, username);

      expect(result).toEqual({
        accessToken: mockAccessToken,
        refreshToken: mockRefreshToken,
      });

      expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
      expect(configService.getOrThrow).toHaveBeenCalledWith(
        'JWT_REFRESH_SECRET',
      );
      expect(configService.getOrThrow).toHaveBeenCalledWith(
        'JWT_REFRESH_TOKEN_EXPIRES_IN',
      );
    });
  });
});
