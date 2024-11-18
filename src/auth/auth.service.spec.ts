// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthService } from './auth.service';
// import { JwtService } from '@nestjs/jwt';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { User } from '../users/entities/user.entity';
// import { GenerateTokenService } from './generate-token.service';
// import { ConfigService } from '@nestjs/config';
// import { Repository } from 'typeorm';
// import { UnauthorizedException, ForbiddenException } from '@nestjs/common';
// import * as bcrypt from 'bcryptjs';
// import { JwtPayload } from './interfaces/jwt-payload.interface';

// describe('AuthService', () => {
//   let service: AuthService;
//   // let userRepository: Repository<User>;
//   // let generateTokenService: GenerateTokenService;

//   const mockUser = {
//     id: '1',
//     username: 'testuser',
//     password: 'hashedPassword123',
//     status: 'active',
//   };

//   const mockUserRepository = {
//     findOneBy: jest.fn(),
//     save: jest.fn(),
//   };

//   const mockGenerateTokenService = {
//     signToken: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         AuthService,
//         {
//           provide: getRepositoryToken(User),
//           useValue: mockUserRepository,
//         },
//         {
//           provide: JwtService,
//           useValue: { sign: jest.fn() },
//         },
//         {
//           provide: GenerateTokenService,
//           useValue: mockGenerateTokenService,
//         },
//         {
//           provide: ConfigService,
//           useValue: { getOrThrow: jest.fn() },
//         },
//       ],
//     }).compile();

//     service = module.get<AuthService>(AuthService);
//     // userRepository = module.get<Repository<User>>(getRepositoryToken(User));
//     // generateTokenService =
//     //   module.get<GenerateTokenService>(GenerateTokenService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('login', () => {
//     it('should successfully login a user', async () => {
//       const loginDto = { username: 'testuser', password: 'password123' };
//       const mockTokens = {
//         accessToken: 'mockAccessToken',
//         refreshToken: 'mockRefreshToken',
//       };

//       jest
//         .spyOn(bcrypt, 'compare')
//         .mockImplementation(() => Promise.resolve(true));
//       mockUserRepository.findOneBy.mockResolvedValue(mockUser);
//       mockGenerateTokenService.signToken.mockResolvedValue(mockTokens);

//       const result = await service.login(loginDto);

//       expect(result).toBeDefined();
//       expect(result.username).toBe(mockUser.username);
//       expect(result.accessToken).toBe(mockTokens.accessToken);
//       expect(result.refreshToken).toBe(mockTokens.refreshToken);
//     });

//     it('should throw ForbiddenException when user does not exist', async () => {
//       const loginDto = { username: 'nonexistent', password: 'password123' };
//       mockUserRepository.findOneBy.mockResolvedValue(null);

//       await expect(service.login(loginDto)).rejects.toThrow(ForbiddenException);
//     });

//     it('should throw UnauthorizedException when password is incorrect', async () => {
//       const loginDto = { username: 'testuser', password: 'wrongpassword' };

//       mockUserRepository.findOneBy.mockResolvedValue(mockUser);
//       jest
//         .spyOn(bcrypt, 'compare')
//         .mockImplementation(() => Promise.resolve(false));

//       await expect(service.login(loginDto)).rejects.toThrow(
//         UnauthorizedException,
//       );
//     });
//   });

//   describe('verify', () => {
//     it('should successfully verify a JWT payload', async () => {
//       const payload = <JwtPayload>{ username: 'testuser', userId: '1' };
//       mockUserRepository.findOneBy.mockResolvedValue(mockUser);

//       const result = await service.verify(payload);

//       expect(result).toEqual(mockUser);
//       expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
//         username: payload.username,
//       });
//     });

//     it('should throw UnauthorizedException when user not found', async () => {
//       const payload = <JwtPayload>{ username: 'nonexistent', userId: '1' };
//       mockUserRepository.findOneBy.mockResolvedValue(null);

//       await expect(service.verify(payload)).rejects.toThrow(
//         UnauthorizedException,
//       );
//     });
//   });
// });
