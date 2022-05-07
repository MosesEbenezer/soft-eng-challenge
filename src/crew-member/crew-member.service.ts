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

  // Given that the officer wants to add a crew member, when he sends the name of the member and the ship he wants to add,
  // then the crew member is added if the ship contains less than 5 crew members;
}
