import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBirthdayDto } from './dto/create-birthday.dto';
import { UpdateBirthdayDto } from './dto/update-birthday.dto';
import { Birthday } from './schemas/birthday.schema';
import { getBirthdayDateFromDate } from './utils';

@Injectable({ scope: Scope.REQUEST })
export class BirthdaysService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectModel(Birthday.name) private birthdayModel: Model<Birthday>,
  ) {}

  create(dto: CreateBirthdayDto) {
    const birthday = new this.birthdayModel({
      ...dto,
      date: getBirthdayDateFromDate(dto.date),
      owner: this.request['user'].sub,
    });

    return birthday.save();
  }

  findAll() {
    return this.birthdayModel
      .find({ owner: this.request['user'].sub })
      .sort({ 'date.month': 1, 'date.day': 1 });
  }

  async update(id: string, dto: UpdateBirthdayDto) {
    const birthdayExists = await this.birthdayModel.exists({ _id: id });

    if (!birthdayExists) {
      throw new NotFoundException(undefined, 'Birthday was not found');
    }

    return this.birthdayModel.findByIdAndUpdate(
      id,
      {
        ...dto,
        date: dto.date ? getBirthdayDateFromDate(dto.date) : undefined,
      },
      { new: true },
    );
  }
}
