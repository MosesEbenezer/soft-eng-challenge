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
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import { AddCrewMemberDto } from './dto/add-crew-member.dto';
import { SwitchCrewMemberDto } from './dto/switch-crew-member.dto';

@ApiTags('Ship')
@UseInterceptors(ResponseInterceptor)
@Controller('ship')
export class ShipController {
  constructor(private readonly shipService: ShipService) {}

  @Get()
  async findAll() {
    const ships = await this.shipService.findAll(['crew_members']);
    return { data: ships };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const ship = await this.shipService.findShip(+id);
    return { data: ship };
  }

  @Patch('/add/crewmember')
  async addCrewMemberToShip(@Body() addCrewMemberDto: AddCrewMemberDto) {
    const ship = await this.shipService.addCrewMemberToShip(addCrewMemberDto);
    return { data: ship };
  }

  @Patch('/switch/crewmember')
  async switchCrewMember(@Body() switchCrewMemberDto: SwitchCrewMemberDto) {
    const ship = await this.shipService.switchCrewMember(switchCrewMemberDto);
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
