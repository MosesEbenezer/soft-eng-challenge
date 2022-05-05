import { Test, TestingModule } from '@nestjs/testing';
import { MotherShipController } from './mother-ship.controller';
import { MotherShipService } from './mother-ship.service';

describe('MotherShipController', () => {
  let controller: MotherShipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotherShipController],
      providers: [MotherShipService],
    }).compile();

    controller = module.get<MotherShipController>(MotherShipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
