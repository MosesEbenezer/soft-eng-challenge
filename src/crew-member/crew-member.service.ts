import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { CreateCrewMemberDto } from './dto/create-crew-member.dto';
// import { UpdateCrewMemberDto } from './dto/update-crew-member.dto';
import { CrewMember } from './entities/crew-member.entity';

@Injectable()
export class CrewMemberService extends AbstractService {
  constructor(
    @InjectRepository(CrewMember)
    private readonly crewMemberRepo: Repository<CrewMember>,
  ) {
    super(crewMemberRepo);
  }
}
