import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private signToken(user: User) {
    return this.jwtService.signAsync({ sub: user._id, login: user.login });
  }

  async signUp(dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    const token = await this.signToken(user);

    return { token };
  }

  async signIn(dto: SignInDto) {
    try {
      const user = await this.usersService.findOne(dto.login);

      const isPasswordCorrect = await bcrypt.compare(
        dto.password,
        user.password,
      );

      if (!isPasswordCorrect) {
        throw new UnauthorizedException(undefined, 'Invalid login or password');
      }

      const token = await this.signToken(user);

      return { token };
    } catch (err: any) {
      if (err instanceof NotFoundException) {
        throw new UnauthorizedException(undefined, 'Invalid login or password');
      }

      throw err;
    }
  }
}
