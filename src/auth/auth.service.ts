import { GenerateTokenService } from './generate-token.service';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { compare } from 'bcryptjs';
import { JwtToken } from './interfaces/jwt-token.interface';
import { User } from 'src/users/entities/user.entity';
import { UserResponse } from 'src/users/interfaces/users.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly tokenService: GenerateTokenService,
  ) {}

  async login(createAuthDto: LoginDto): Promise<UserResponse> {
    const { username } = createAuthDto;
    const confirmUser = await this.userRepository.findOneBy({ username });
    if (!confirmUser) {
      throw new ForbiddenException('User does not exit');
    }

    const user = await this.verifyUser(createAuthDto, confirmUser);
    const token: JwtToken = await this.tokenService.signToken(
      user.id,
      user.username,
    );
    return new UserResponse({
      ...user,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    });
  }

  async verify(payload: JwtPayload): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({
        username: payload.username,
      });
      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      throw new UnauthorizedException();
    }
  }
  private async verifyUser(loginDto: LoginDto, user: User): Promise<User> {
    const { password } = loginDto;

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid username/password');
    }
    return user;
  }

  refreshToken(payload: any) {
    console.log(payload);
    console.log('Continue');

    //  const token: JwtToken = await this.tokenService.signToken(
    //    user.id,
    //    user.username,
    //  );
  }
}
