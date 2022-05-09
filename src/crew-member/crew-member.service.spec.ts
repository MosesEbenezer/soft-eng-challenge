import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CrewMemberService } from './crew-member.service';
import { CrewMember } from './entities/crew-member.entity';

describe('CrewMemberService', () => {
  let service: CrewMemberService;

  const mockCrewMemberRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrewMemberService,
        {
          provide: getRepositoryToken(CrewMember),
          useValue: mockCrewMemberRepository,
        },
      ],
    }).compile();

    service = module.get<CrewMemberService>(CrewMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
