import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { GenerateTokenService } from '../auth/generate-token.service';

describe('UsersController', () => {
  let controller: UsersController;
  let userRepo: Repository<User>;
  let generateTokenService: GenerateTokenService;

  const mockUserRepository = {
    save: jest.fn(),
    find: jest.fn(),
  };

  const mockGenerateTokenService = {
    signToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
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

    controller = module.get<UsersController>(UsersController);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
    generateTokenService =
      module.get<GenerateTokenService>(GenerateTokenService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
