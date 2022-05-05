import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotherShipModule } from './mother-ship/mother-ship.module';
import { ShipModule } from './ship/ship.module';
import { CrewMemberModule } from './crew-member/crew-member.module';
import * as connectionOptions from '../ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(connectionOptions),
    MotherShipModule,
    ShipModule,
    CrewMemberModule,
  ],
  providers: [],
})
export class AppModule {}
