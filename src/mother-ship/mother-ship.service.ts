import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { AbstractService } from 'src/common/abstract.service';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMotherShipDto } from './dto/create-mother-ship.dto';
import { MotherShip } from './entities/mother-ship.entity';
import { Repository } from 'typeorm';
import { AddShipToMotherShipDto } from './dto/add-ship-to-mothership.dto';

@Injectable()
export class MotherShipService extends AbstractService {
  constructor(
    @InjectRepository(MotherShip)
    private readonly motherShipRepo: Repository<MotherShip>,
  ) {
    super(motherShipRepo);
  }

  async createMotherShip(createMotherShipDto: CreateMotherShipDto) {
    const { mothership_name } = createMotherShipDto;
    await this.validateExisting(createMotherShipDto);

    const ships = await this.prepareShips();

    console.log('ships prepared', ships);

    const mothership = await this.create({
      mother_ship_name: mothership_name,
      ships: ships,
    });

    if (!mothership)
      throw new NotImplementedException('Mother Ship Creation Failed');

    return mothership;
  }

  async addShipToMotherShip(addShipToMotherShipDto: AddShipToMotherShipDto) {
    const { mothership_id, number_of_ships } = addShipToMotherShipDto;

    const mothership = await this.findMotherShip({ id: mothership_id });
    await this.validateCapacity(mothership, number_of_ships);
    const ships = await this.prepareShips(number_of_ships);

    mothership.ships = [...mothership.ships, ...ships];
    const updated_mothership = this.motherShipRepo.save(mothership);

    return updated_mothership;
  }

  async validateExisting(createMotherShipDto: CreateMotherShipDto) {
    const { mothership_name } = createMotherShipDto;

    const mothership = await this.findOne({
      mother_ship_name: mothership_name,
    });

    if (mothership)
      throw new NotAcceptableException(
        'Mother Ship Name Already Exist, Update Instead',
      );
  }

  async prepareShips(number_of_ships?: number) {
    const initial_ships = number_of_ships || 3;

    const crew_members = await this.prepareCrewMembers();
    const ships_array = await this.prepareArray(
      initial_ships,
      'ship',
      crew_members,
    );

    console.log('ships array', ships_array);
    return ships_array;
  }

  async prepareCrewMembers(crew_number?: number) {
    const initial_crew_members = crew_number || 3;

    const crew_members_array = await this.prepareArray(
      initial_crew_members,
      'crewmember',
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

  async validateCapacity(mothership: MotherShip, number_of_ships: number) {
    const existing_ships = mothership.ships.length;
    const mothership_capacity = mothership.capacity;

    if (existing_ships >= mothership_capacity) {
      throw new NotAcceptableException(
        'More ships Cannot Be Added To Mothership. It Is Already At Full Capacity',
      );
    }

    if (existing_ships + number_of_ships > mothership_capacity) {
      throw new NotAcceptableException(
        `Mothership Capacity Exceeded!. Only ${
          mothership_capacity - existing_ships
        } more ships can be added to mother ship`,
      );
    }
  }

  async getUniqueName(prefix: string) {
    return `${prefix}${Math.floor(Math.random() * 1004 * 2121)}`;
  }

  async findMotherShip(condition: unknown) {
    const mothership = await this.findOne(condition, [
      'ships',
      'ships.crew_members',
    ]);
    if (!mothership) throw new NotFoundException('Mother Ship Not Found');

    return mothership;
  }
}
