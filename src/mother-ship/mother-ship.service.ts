import { Injectable } from '@nestjs/common';
import { AbstractService } from 'src/common/abstract.service';
import { InjectRepository } from '@nestjs/typeorm';
// import { CreateMotherShipDto } from './dto/create-mother-ship.dto';
// import { UpdateMotherShipDto } from './dto/update-mother-ship.dto';
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
}
