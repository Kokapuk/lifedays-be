import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BirthdaysService } from './birthdays.service';
import { CreateBirthdayDto } from './dto/create-birthday.dto';
import { UpdateBirthdayDto } from './dto/update-birthday.dto';

@Controller('birthdays')
export class BirthdaysController {
  constructor(private birthdaysService: BirthdaysService) {}

  @Post('/')
  create(@Body() dto: CreateBirthdayDto) {
    return this.birthdaysService.create(dto);
  }

  @Get('/')
  findAll() {
    return this.birthdaysService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBirthdayDto) {
    return this.birthdaysService.update(id, dto);
  }
}
