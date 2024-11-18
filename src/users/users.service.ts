import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { UserResponse } from './interfaces/users.interface';
import { GenerateTokenService } from '../auth/generate-token.service';
import { JwtToken } from '../auth/interfaces/jwt-token.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly tokenService: GenerateTokenService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const hashpassword = await hash(password, 10);
    const user: User = await this.userRepository.save({
      username,
      password: hashpassword,
    });

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

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} ${updateUserDto} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
