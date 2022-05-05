import { Test, TestingModule } from '@nestjs/testing';
import { MotherShipService } from './mother-ship.service';

describe('MotherShipService', () => {
  let service: MotherShipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotherShipService],
    }).compile();

    service = module.get<MotherShipService>(MotherShipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
