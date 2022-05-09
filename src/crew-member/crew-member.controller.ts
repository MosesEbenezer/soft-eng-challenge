import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import { CrewMemberService } from './crew-member.service';
import { UpdateCrewMemberDto } from './dto/update-crew-member.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Crew Member')
@UseInterceptors(ResponseInterceptor)
@Controller('crewmember')
export class CrewMemberController {
  constructor(private readonly crewMemberService: CrewMemberService) {}

  @Get()
  async findAll() {
    const crew_members = await this.crewMemberService.findAll(['ship']);
    return { data: crew_members };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const crew_member = await this.crewMemberService.findOne(+id, ['ship']);
    return { data: crew_member };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCrewMemberDto: UpdateCrewMemberDto,
  ) {
    const crew_member = await this.crewMemberService.update(+id, {
      ...updateCrewMemberDto,
    });

    return { data: crew_member };
  }
}
