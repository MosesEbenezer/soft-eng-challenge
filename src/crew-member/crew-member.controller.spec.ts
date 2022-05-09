import { Test, TestingModule } from '@nestjs/testing';
import { CrewMemberController } from './crew-member.controller';
import { CrewMemberService } from './crew-member.service';

describe('CrewMemberController', () => {
  let controller: CrewMemberController;

  const mockCrewMemberService = {
    ///
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrewMemberController],
      providers: [CrewMemberService],
    })
      .overrideProvider(CrewMemberService)
      .useValue(mockCrewMemberService)
      .compile();

    controller = module.get<CrewMemberController>(CrewMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
