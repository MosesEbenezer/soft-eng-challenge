import { Module } from '@nestjs/common';
import { MotherShipService } from './mother-ship.service';
import { MotherShipController } from './mother-ship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotherShip } from './entities/mother-ship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MotherShip])],
  controllers: [MotherShipController],
  providers: [MotherShipService],
  exports: [MotherShipService],
})
export class MotherShipModule {}
