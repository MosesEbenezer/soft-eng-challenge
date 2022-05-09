import { Test, TestingModule } from '@nestjs/testing';
import { MotherShipController } from './mother-ship.controller';
import { MotherShipService } from './mother-ship.service';

describe('MotherShipController', () => {
  let controller: MotherShipController;

  const mockMotherShipService = {
    createMotherShip: jest.fn((dto) => {
      return Promise.resolve({
        id: Date.now(),
        ...dto,
      });
    }),

    findAll: jest.fn(() => {
      return Promise.resolve([
        {
          id: Date.now(),
          mothership_name: 'Alpha',
        },
      ]);
    }),

    findOne: jest.fn(() => {
      return Promise.resolve({
        id: Date.now(),
        mothership_name: 'Alpha',
      });
    }),

    findMotherShip: jest.fn(() => {
      return Promise.resolve({
        id: Date.now(),
        mothership_name: 'Alpha',
      });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotherShipController],
      providers: [MotherShipService],
    })
      .overrideProvider(MotherShipService)
      .useValue(mockMotherShipService)
      .compile();

    controller = module.get<MotherShipController>(MotherShipController);
  });

  describe('MotherShipController', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('createMotherShip', () => {
    it('should create a mothership', async () => {
      expect(
        await controller.createMotherShip({ mothership_name: 'Alpha' }),
      ).toEqual({
        data: {
          id: expect.any(Number),
          mothership_name: 'Alpha',
        },
      });
    });
  });

  describe('findAll', () => {
    it('It should find an array of motherships', async () => {
      expect(await controller.findAll()).toEqual({
        data: [
          {
            id: expect.any(Number),
            mothership_name: 'Alpha',
          },
        ],
      });
    });
  });

  describe('findOne', () => {
    it('should return one mothership', async () => {
      expect(await controller.findOne('1')).toEqual({
        data: {
          id: expect.any(Number),
          mothership_name: 'Alpha',
        },
      });
    });
  });
});
