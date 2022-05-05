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
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { CrewMemberService } from './crew-member.service';
import { CreateCrewMemberDto } from './dto/create-crew-member.dto';
import { UpdateCrewMemberDto } from './dto/update-crew-member.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Crew Member')
@UseInterceptors(ResponseInterceptor)
@Controller('crewmember')
export class CrewMemberController {
  constructor(private readonly crewMemberService: CrewMemberService) {}

  @Post()
  create(@Body() createCrewMemberDto: CreateCrewMemberDto) {
    return this.crewMemberService.create(createCrewMemberDto);
  }

  @Get()
  findAll() {
    return this.crewMemberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crewMemberService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCrewMemberDto: UpdateCrewMemberDto,
  ) {
    return this.crewMemberService.update(+id, updateCrewMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crewMemberService.remove(+id);
  }
}
