import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ShipService } from './ship.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateShipDto } from './dto/update-ship.dto';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';

@ApiTags('Ship')
@UseInterceptors(ResponseInterceptor)
@Controller('ship')
export class ShipController {
  constructor(private readonly shipService: ShipService) {}

  @Get()
  async findAll() {
    const ships = await this.shipService.findAll();
    return { data: ships };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const ship = await this.shipService.findOne(+id, ['crew_members']);
    return { data: ship };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateShipDto: UpdateShipDto) {
    const ship = await this.shipService.update(+id, updateShipDto);
    return { data: ship };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipService.remove(+id);
  }
}
