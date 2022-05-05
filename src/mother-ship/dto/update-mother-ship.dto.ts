import { PartialType } from '@nestjs/swagger';
import { CreateMotherShipDto } from './create-mother-ship.dto';

export class UpdateMotherShipDto extends PartialType(CreateMotherShipDto) {}
