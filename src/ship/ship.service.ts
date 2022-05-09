import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { AbstractService } from '../common/abstract.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddCrewMemberDto } from './dto/add-crew-member.dto';
import { SwitchCrewMemberDto } from './dto/switch-crew-member.dto';
import { CrewMemberService } from '../crew-member/crew-member.service';
import { CrewMember } from '../crew-member/entities/crew-member.entity';
import { Ship } from './entities/ship.entity';

@Injectable()
export class ShipService extends AbstractService {
  constructor(
    @InjectRepository(Ship) private readonly shipRepo: Repository<Ship>,
    private readonly crewMemberService: CrewMemberService,
  ) {
    super(shipRepo);
  }

  async addCrewMemberToShip(addCrewMemberDto: AddCrewMemberDto) {
    const { crew_member_name, ship_id } = addCrewMemberDto;

    const ship = await this.findShip(ship_id);
    await this.validateCapacity(ship);

    ship.crew_members = [...ship.crew_members, { name: crew_member_name }];

    const updated_ship = this.shipRepo.save(ship);
    return updated_ship;
  }

  async switchCrewMember(switchCrewMemberDto: SwitchCrewMemberDto) {
    const { crew_member_name, from_ship_id, to_ship_id } = switchCrewMemberDto;

    const crew_member = await this.findCrewMember(crew_member_name);

    const to_ship = await this.findShip(to_ship_id);
    await this.validateCapacity(to_ship);

    const from_ship = await this.findShip(from_ship_id);

    const updated_ship = await this.switchCrew(crew_member, from_ship, to_ship);
    return updated_ship;
  }

  async validateCapacity(ship: Ship) {
    const existing_members = ship.crew_members.length;
    const ship_capacity = ship.capacity;

    if (existing_members >= ship_capacity) {
      throw new NotAcceptableException(
        'More Crew Members Cannot Be Added To Ship. It Is Already At Full Capacity',
      );
    }
  }

  async findShip(id: number) {
    const ship = await this.findOne({ id }, ['crew_members']);
    if (!ship) throw new NotFoundException(`Ship With id ${id} Not Found`);

    return ship;
  }

  async findCrewMember(name: string) {
    return await this.crewMemberService.findCrewMemberByName(name);
  }

  async switchCrew(crew_member: CrewMember, from_ship: Ship, to_ship: Ship) {
    const updated_crew_for_from = from_ship.crew_members.filter((a) => {
      return a.name !== crew_member.name;
    });

    from_ship.crew_members = updated_crew_for_from;
    await this.shipRepo.save(from_ship);

    to_ship.crew_members = [...to_ship.crew_members, crew_member];
    const updated_ship = await this.shipRepo.save(to_ship);

    return updated_ship;
  }
}
