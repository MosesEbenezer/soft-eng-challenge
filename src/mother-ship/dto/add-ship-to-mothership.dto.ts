import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddShipToMotherShipDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  mothership_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  number_of_ships: number;
}
