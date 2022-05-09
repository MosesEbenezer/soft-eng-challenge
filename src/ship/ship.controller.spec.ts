import { Test, TestingModule } from '@nestjs/testing';
import { Ship } from './entities/ship.entity';
import { ShipController } from './ship.controller';
import { ShipService } from './ship.service';

describe('ShipController', () => {
  let controller: ShipController;

  const mockShipService = {
    //
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShipController],
      providers: [ShipService],
    })
      .overrideProvider(Ship)
      .useValue(mockShipService)
      .compile();

    controller = module.get<ShipController>(ShipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
