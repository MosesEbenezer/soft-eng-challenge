import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMotherShipDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mother_ship_name: string;
}
