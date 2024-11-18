import { IsEmpty } from 'class-validator';

export class LoginDto {
  @IsEmpty()
  username: string;
  @IsEmpty()
  password: string;
}
