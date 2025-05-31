import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post('/')
  create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }

  @Get('/')
  findAll() {
    return this.eventsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventsService.update(id, dto);
  }
}
