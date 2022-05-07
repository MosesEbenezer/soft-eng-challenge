import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMotherShipDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  mother_ship_name: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  capacity: number;
}
