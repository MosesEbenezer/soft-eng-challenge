import { Test, TestingModule } from '@nestjs/testing';
import { CrewMemberService } from './crew-member.service';

describe('CrewMemberService', () => {
  let service: CrewMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrewMemberService],
    }).compile();

    service = module.get<CrewMemberService>(CrewMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
