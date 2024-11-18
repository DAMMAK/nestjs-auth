import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthController } from './auth.controller';
import { GenerateTokenService } from './generate-token.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AuthController', () => {
  let controller: AuthController;
  let userRepo: Repository<User>;
  let generateTokenService: GenerateTokenService;

  const mockGenerateTokenService = {
    signToken: jest.fn(),
  };

  const mockUserRepository = {
    save: jest.fn(),
    find: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: GenerateTokenService,
          useValue: mockGenerateTokenService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    generateTokenService =
      module.get<GenerateTokenService>(GenerateTokenService);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
