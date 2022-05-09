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
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { AddShipToMotherShipDto } from './dto/add-ship-to-mothership.dto';

@ApiTags('Mother Ship')
@UseInterceptors(ResponseInterceptor)
@Controller('mothership')
export class MotherShipController {
  constructor(private readonly motherShipService: MotherShipService) {}

  @Post()
  async createMotherShip(@Body() createMotherShipDto: CreateMotherShipDto) {
    const mothership = await this.motherShipService.createMotherShip(
      createMotherShipDto,
    );

    return { data: mothership };
  }

  @Get()
  async findAll() {
    const motherships = await this.motherShipService.findAll();
    return { data: motherships };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const mothership = await this.motherShipService.findMotherShip({ id });
    return { data: mothership };
  }

  @Patch('add/ship/')
  async addShipToMotherShip(
    @Body() addShipToMotherShipDto: AddShipToMotherShipDto,
  ) {
    const mothership = await this.motherShipService.addShipToMotherShip(
      addShipToMotherShipDto,
    );

    return { data: mothership };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMotherShipDto: UpdateMotherShipDto,
  ) {
    const mothership = await this.motherShipService.update(+id, {
      ...updateMotherShipDto,
    });

    return { data: mothership };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.motherShipService.remove(+id);
    return { data: 'deleted' };
  }
}
