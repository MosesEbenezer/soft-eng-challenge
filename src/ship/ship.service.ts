import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ship } from './entities/ship.entity';
import { AddCrewMemberDto } from './dto/add-crew-member.dto';

@Injectable()
export class ShipService extends AbstractService {
  constructor(
    @InjectRepository(Ship) private readonly shipRepo: Repository<Ship>,
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
}
