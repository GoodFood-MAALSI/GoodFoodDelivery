import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransportModesService } from './transport-modes.service';
import { CreateTransportModeDto } from './dto/create-transport-mode.dto';
import { UpdateTransportModeDto } from './dto/update-transport-mode.dto';

@Controller('transport-modes')
export class TransportModesController {
  constructor(private readonly transportModesService: TransportModesService) {}

  @Post()
  create(@Body() createTransportModeDto: CreateTransportModeDto) {
    return this.transportModesService.create(createTransportModeDto);
  }

  @Get()
  findAll() {
    return this.transportModesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transportModesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransportModeDto: UpdateTransportModeDto) {
    return this.transportModesService.update(+id, updateTransportModeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transportModesService.remove(+id);
  }
}
