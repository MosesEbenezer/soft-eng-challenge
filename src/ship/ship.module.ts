import { Module } from '@nestjs/common';
import { ShipService } from './ship.service';
import { ShipController } from './ship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ship } from './entities/ship.entity';
import { CrewMemberModule } from 'src/crew-member/crew-member.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ship]), CrewMemberModule],
  controllers: [ShipController],
  providers: [ShipService],
  exports: [ShipService],
})
export class ShipModule {}
