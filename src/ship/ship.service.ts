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
}
