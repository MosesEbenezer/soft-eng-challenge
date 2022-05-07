import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CrewMember } from './entities/crew-member.entity';

@Injectable()
export class CrewMemberService extends AbstractService {
  constructor(
    @InjectRepository(CrewMember)
    private readonly crewMemberRepo: Repository<CrewMember>,
  ) {
    super(crewMemberRepo);
  }

  async findCrewMemberByName(name: string) {
    const crew_member = await this.findOne({
      name,
    });

    if (!crew_member) throw new NotFoundException('Crew Member Not Found');
    return crew_member;
  }
}
