import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { MotherShipService } from './mother-ship.service';
import { CreateMotherShipDto } from './dto/create-mother-ship.dto';
import { UpdateMotherShipDto } from './dto/update-mother-ship.dto';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Mother Ship')
@UseInterceptors(ResponseInterceptor)
@Controller('mothership')
export class MotherShipController {
  constructor(private readonly motherShipService: MotherShipService) {}

  @Post()
  async create(@Body() createMotherShipDto: CreateMotherShipDto) {
    const mother_ship = await this.motherShipService.createMotherShip(
      createMotherShipDto,
    );

    return { data: mother_ship };
  }

  @Get()
  findAll() {
    return this.motherShipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.motherShipService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMotherShipDto: UpdateMotherShipDto,
  ) {
    return this.motherShipService.update(+id, updateMotherShipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.motherShipService.remove(+id);
  }
}
