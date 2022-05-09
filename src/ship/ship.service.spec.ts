import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ship } from './entities/ship.entity';
import { ShipService } from './ship.service';

describe('ShipService', () => {
  let service: ShipService;

  const mockShipRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShipService,
        {
          provide: getRepositoryToken(Ship),
          useValue: mockShipRepository,
        },
      ],
    }).compile();

    service = module.get<ShipService>(ShipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('findShip', () => {
  //   it('it should find one ship', async () => {
  //     expect(await service.findShip(1)).toEqual({
  //       id: expect.any(Number),
  //       name: 'ship1',
  //     });
  //   });
  // });
});
