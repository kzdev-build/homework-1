import { Test, TestingModule } from '@nestjs/testing';
import { CouriersController } from './couriers.controller';
import { CouriersService } from './couriers.service';
import { CreateCourierDto } from './dto/create-courier.dto';
import { UpdateCourierDto } from './dto/update-courier.dto';
import { Courier } from './entities/courier.entity';

describe('CouriersController', () => {
  let couriersController: CouriersController;
  let couriersService: CouriersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouriersController],
      providers: [CouriersService],
    }).compile();

    couriersController = module.get<CouriersController>(CouriersController);
    couriersService = module.get<CouriersService>(CouriersService);
  });

  it('should be defined', () => {
    expect(couriersController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of courier', async () => {
      const result: Array<Courier> = [{ id: 'test', max_capacity: 10 }];
      jest.spyOn(couriersService, 'findAll').mockImplementation(() => result);

      expect(await couriersController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a courier', async () => {
      const mockId = 'courierId';
      const mockCourier: Courier = { id: mockId, max_capacity: 10 };

      jest
        .spyOn(couriersService, 'findOne')
        .mockImplementation((id) => mockCourier);

      expect(await couriersController.findOne(mockId)).toBe(mockCourier);
    });

    it('should throw an error when courier not found', async () => {
      const mockId = 'courierId';
      jest.spyOn(couriersService, 'findOne').mockImplementation((id) => {
        throw new Error('Not found');
      });

      expect(() => couriersController.findOne(mockId)).toThrowError();
    });
  });

  describe('findCouriersWithAvailableSpace', () => {
    it('should return an array of courier', async () => {
      const result: Array<Courier> = [{ id: 'test', max_capacity: 10 }];

      jest
        .spyOn(couriersService, 'findCouriersWithAvailableSpace')
        .mockImplementation(() => result);

      expect(await couriersController.findCouriersWithAvailableSpace(15)).toBe(
        result,
      );
    });
  });

  describe('create', () => {
    it('should create and return the new object', async () => {
      const result: Array<Courier> = [{ id: 'test', max_capacity: 10 }];
      const dto: CreateCourierDto = { id: 'courier-2', max_capacity: 1 };
      jest.spyOn(couriersService, 'create').mockImplementation((dto) => {
        result.push({ ...dto });
        return { ...dto };
      });

      expect(await couriersController.create(dto)).toEqual({ ...dto });
      expect(result.length).toEqual(2);
    });

    it('should throw an error when courier id exist', async () => {
      const dto: CreateCourierDto = { id: 'courier-2', max_capacity: 1 };
      jest.spyOn(couriersService, 'create').mockImplementation(() => {
        throw new Error();
      });

      expect(() => couriersController.create(dto)).toThrowError();
    });
  });

  describe('update', () => {
    it('should update courier and return the updated object', async () => {
      const result: Array<Courier> = [{ id: 'courier-2', max_capacity: 10 }];

      const idMock = 'courier-2';
      const dto: UpdateCourierDto = { max_capacity: 1 };

      jest
        .spyOn(couriersService, 'update')
        .mockImplementation((id, updateCourierDto) => {
          result.find((c) => c.id === id).max_capacity =
            updateCourierDto.max_capacity;
          return result.find((c) => c.id === id);
        });

      expect(await couriersController.update(idMock, dto)).toEqual({
        id: idMock,
        ...dto,
      });

      expect(result.length).toEqual(1);
    });

    it('should throw an error when courier not found', async () => {
      const idMock = 'courier-2';
      const dto: UpdateCourierDto = { max_capacity: 1 };
      jest
        .spyOn(couriersService, 'update')
        .mockImplementation((id, updateCourierDto) => {
          throw new Error('Not found');
        });

      expect(() => couriersController.update(idMock, dto)).toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a courier', async () => {
      const mockId = 'courierId';
      const mockCourier: Courier = { id: mockId, max_capacity: 10 };

      jest
        .spyOn(couriersService, 'remove')
        .mockImplementation((id) => mockCourier);

      expect(await couriersController.remove(mockId)).toBe(mockCourier);
    });

    it('should throw an error when courier not found', async () => {
      const mockId = 'courierId';
      jest.spyOn(couriersService, 'remove').mockImplementation((id) => {
        throw new Error('Not found');
      });

      expect(() => couriersController.remove(mockId)).toThrowError();
    });
  });
});
