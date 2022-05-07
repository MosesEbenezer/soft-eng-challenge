import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { CreateShipDto } from './dto/create-ship.dto';
// import { UpdateShipDto } from './dto/update-ship.dto';
import { Ship } from './entities/ship.entity';

@Injectable()
export class ShipService extends AbstractService {
  constructor(
    @InjectRepository(Ship) private readonly shipRepo: Repository<Ship>,
  ) {
    super(shipRepo);
  }

  // Given that the officer wants to remove a ship, when he tries he send which ship he wants to remove, then the ship will be removed along with all its crew members

  // When the officer tries to add more ships or crew members over the capacities, then an error is raised pointing out what is wrong
}
