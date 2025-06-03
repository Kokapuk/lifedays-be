import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(dto: CreateUserDto) {
    const isLoginTaken = await this.userModel.exists({ login: dto.login });

    if (isLoginTaken) {
      throw new ConflictException(undefined, 'Login is already taken');
    }

    const saltOrRounds = 10;
    const passwordHash = await bcrypt.hash(dto.password, saltOrRounds);

    const user = new this.userModel({ ...dto, password: passwordHash });

    return user.save();
  }

  async findOne(login: string) {
    const user = await this.userModel.findOne({ login }).select('+password');

    if (!user) {
      throw new NotFoundException(undefined, 'User was not found');
    }

    return user;
  }
}
