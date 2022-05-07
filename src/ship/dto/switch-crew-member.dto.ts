import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SwitchCrewMemberDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  crew_member_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  from_ship_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  to_ship_id: number;
}
