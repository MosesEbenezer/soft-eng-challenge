import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MotherShip } from './entities/mother-ship.entity';
import { MotherShipService } from './mother-ship.service';

describe('MotherShipService', () => {
  let service: MotherShipService;

  const mockMothershipRepository = {
    createMotherShip: jest.fn((dto) => {
      return Promise.resolve({
        id: Date.now(),
        ...dto,
        ships: [
          {
            id: expect.any(Number),
            name: 'shipName1',
            crew_members: [
              {
                id: expect.any(Number),
                name: 'member1',
              },
              {
                id: expect.any(Number),
                name: 'member2',
              },
              {
                id: expect.any(Number),
                name: 'member3',
              },
            ],
          },
          {
            id: expect.any(Number),
            name: 'shipName2',
            crew_members: [
              {
                id: expect.any(Number),
                name: 'member4',
              },
              {
                id: expect.any(Number),
                name: 'member5',
              },
              {
                id: expect.any(Number),
                name: 'member6',
              },
            ],
          },
          {
            id: expect.any(Number),
            name: 'shipName3',
            crew_members: [
              {
                id: expect.any(Number),
                name: 'member10',
              },
              {
                id: expect.any(Number),
                name: 'member11',
              },
              {
                id: expect.any(Number),
                name: 'member12',
              },
            ],
          },
        ],
      });
    }),
    validateExisting: jest.fn(() => {
      return null;
    }),

    findOne: jest.fn(() => {
      return null;
    }),

    save: jest.fn(() => {
      return Promise.resolve({
        id: Date.now(),
        mothership_name: 'Bettar',
      });
    }),

    addShipToMotherShip: jest.fn(() => {
      return Promise.resolve({
        id: 1,
        ships: [
          {
            id: expect.any(Number),
            name: 'shipName1',
            crew_members: [
              {
                id: expect.any(Number),
                name: 'member1',
              },
              {
                id: expect.any(Number),
                name: 'member2',
              },
              {
                id: expect.any(Number),
                name: 'member3',
              },
            ],
          },
          {
            id: expect.any(Number),
            name: 'shipName2',
            crew_members: [
              {
                id: expect.any(Number),
                name: 'member4',
              },
              {
                id: expect.any(Number),
                name: 'member5',
              },
              {
                id: expect.any(Number),
                name: 'member6',
              },
            ],
          },
        ],
      });
    }),

    findMotherShip: jest.fn(() => {
      return Promise.resolve({
        id: Date.now(),
        mothership_name: 'Bettar',
        ships: [
          {
            id: expect.any(Number),
            name: 'shipName1',
            crew_members: [],
          },
          {
            id: expect.any(Number),
            name: 'shipName2',
            crew_members: [],
          },
        ],
      });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MotherShipService,
        {
          provide: getRepositoryToken(MotherShip),
          useValue: mockMothershipRepository,
        },
      ],
    }).compile();

    service = module.get<MotherShipService>(MotherShipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMotherShip', () => {
    it('should create mothership', async () => {
      expect(
        await service.createMotherShip({ mothership_name: 'Bettar' }),
      ).toEqual({
        id: expect.any(Number),
        mothership_name: 'Bettar',
      });
    });
  });

  describe('validateExisting', () => {
    it('should validate existing mothership', async () => {
      expect(
        await service.validateExisting({ mothership_name: 'Bettar' }),
      ).toEqual(undefined);
    });
  });

  describe('getUniqueName', () => {
    it('should get unique name', async () => {
      expect(await service.getUniqueName('str')).toEqual(expect.any(String));
    });
  });
});
