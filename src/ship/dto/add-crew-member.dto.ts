import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddCrewMemberDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  crew_member_name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  ship_id: number;
}
