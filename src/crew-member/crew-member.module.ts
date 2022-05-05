import { Module } from '@nestjs/common';
import { CrewMemberService } from './crew-member.service';
import { CrewMemberController } from './crew-member.controller';
import { CrewMember } from './entities/crew-member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CrewMember])],
  controllers: [CrewMemberController],
  providers: [CrewMemberService],
  exports: [CrewMemberService],
})
export class CrewMemberModule {}
