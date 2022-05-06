import {
  Injectable,
  NotAcceptableException,
  NotImplementedException,
} from '@nestjs/common';
import { AbstractService } from 'src/common/abstract.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMotherShipDto } from './dto/create-mother-ship.dto';
import { MotherShip } from './entities/mother-ship.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MotherShipService extends AbstractService {
  constructor(
    @InjectRepository(MotherShip)
    private readonly motherShipRepo: Repository<MotherShip>,
  ) {
    super(motherShipRepo);
  }

  async createMotherShip(createMotherShipDto: CreateMotherShipDto) {
    const { mother_ship_name } = createMotherShipDto;
    await this.validateExisting(createMotherShipDto);

    const ships = await this.prepareShips();
    const mother_ship = await this.create({
      mother_ship_name,
      ships,
    });

    if (!mother_ship)
      throw new NotImplementedException('Mother Ship Creation Failed');

    return mother_ship;
  }

  async validateExisting(createMotherShipDto: CreateMotherShipDto) {
    const { mother_ship_name } = createMotherShipDto;

    const mother_ship = await this.findOne({
      mother_ship_name,
    });

    if (mother_ship)
      throw new NotAcceptableException(
        'Mother Ship Name Already Exist, Update Instead',
      );
  }

  async prepareShips() {
    const initial_ships = 3;

    const crew_members = await this.prepareCrewMembers();
    const ships_array = await this.prepareArray(
      initial_ships,
      'ship',
      crew_members,
    );

    return ships_array;
  }

  async prepareCrewMembers() {
    const initial_crew_members = 3;

    const crew_members_array = await this.prepareArray(
      initial_crew_members,
      'member',
    );

    return crew_members_array;
  }

  async prepareArray(
    arr_length: number,
    prefix: string,
    crew_members?: unknown,
  ) {
    const array = [];

    for (let i = 1; i <= arr_length; i++) {
      const unique_name = await this.getUniqueName(prefix);
      array.push({ name: unique_name, crew_members });
    }

    return array;
  }

  async validateCapacity() {
    //
  }

  async getUniqueName(prefix: string) {
    return `${prefix}${Math.floor(Math.random() * 1004 * 2121)}`;
  }
}
