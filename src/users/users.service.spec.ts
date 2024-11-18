import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { GenerateTokenService } from '../auth/generate-token.service';
import * as bcrypt from 'bcryptjs';

describe('UsersService', () => {
  let service: UsersService;
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

    service = module.get<UsersService>(UsersService);
    generateTokenService = module.get<GenerateTokenService>(GenerateTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user and return tokens', async () => {
      const createUserDto = {
        username: 'testuser',
        password: 'password123',
      };

      const mockUser = {
        id: '1',
        username: 'testuser',
        password: 'hashedPassword',
        status: 'active',
      };

      const mockTokens = {
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken',
      };

      jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve('hashedPassword'));
      mockUserRepository.save.mockResolvedValue(mockUser);
      mockGenerateTokenService.signToken.mockResolvedValue(mockTokens);

      const result = await service.create(createUserDto);

      expect(result).toBeDefined();
      expect(result.username).toBe(createUserDto.username);
      expect(result.accessToken).toBe(mockTokens.accessToken);
      expect(result.refreshToken).toBe(mockTokens.refreshToken);
      expect(mockUserRepository.save).toHaveBeenCalled();
      expect(generateTokenService.signToken).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsers = [
        { id: '1', username: 'user1' },
        { id: '2', username: 'user2' },
      ];

      mockUserRepository.find.mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(result).toEqual(mockUsers);
      expect(mockUserRepository.find).toHaveBeenCalled();
    });
  });
});
