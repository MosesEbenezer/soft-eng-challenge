import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMotherShipDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mothership_name: string;
}
