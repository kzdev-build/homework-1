import { Test, TestingModule } from '@nestjs/testing';
import { CouriersService } from './couriers.service';

describe('CouriersService', () => {
  let service: CouriersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouriersService],
    }).compile();

    service = module.get<CouriersService>(CouriersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of couriers with 1 element', async () => {
      service.create({ id: '1', max_capacity: 5 });
      expect(service.findAll()).toHaveLength(1);
    });
  });

  describe('findCouriersWithAvailableSpace', () => {
    beforeEach(() => {
      service.create({ id: '1', max_capacity: 5 });
      service.create({ id: '2', max_capacity: 10 });
    });

    it('should return an array with 2 elements', async () => {
      expect(service.findCouriersWithAvailableSpace(5)).toHaveLength(2);
    });

    it('should return an empty array', async () => {
      expect(service.findCouriersWithAvailableSpace(100)).toHaveLength(0);
    });
  });

  describe('findOne', () => {
    beforeEach(() => {
      service.create({ id: '1', max_capacity: 5 });
      service.create({ id: '2', max_capacity: 10 });
    });

    it('should return a courier', async () => {
      expect(service.findOne('1')).not.toBeNull();
    });

    it('should throw an error if courier id exist', async () => {
      expect(() => service.findOne('5')).toThrowError();
    });
  });

  describe('create', () => {
    it('should add element to list', async () => {
      const res = { id: '1', max_capacity: 5 };
      expect(service.create({ id: '1', max_capacity: 5 })).toEqual(res);
    });

    it('should throw an error if courier id exist', async () => {
      service.create({ id: '1', max_capacity: 5 });
      expect(() => service.create({ id: '1', max_capacity: 5 })).toThrowError();
    });
  });

  describe('update', () => {
    beforeEach(() => {
      service.create({ id: '1', max_capacity: 5 });
      service.create({ id: '2', max_capacity: 10 });
    });

    it('should update courier', async () => {
      const id = '1';
      const dto = { max_capacity: 5 };

      expect(service.update(id, dto)).not.toBeNull();
    });

    it('should throw an error if courier id not found', async () => {
      const id = '12';
      const dto = { max_capacity: 5 };

      expect(() => service.update(id, dto)).toThrowError();
    });
  });

  describe('remove', () => {
    beforeEach(() => {
      service.create({ id: '1', max_capacity: 5 });
      service.create({ id: '2', max_capacity: 10 });
    });

    it('should remove a courier', async () => {
      service.remove('1');
      expect(service.findAll()).toHaveLength(1);
    });

    it('should throw an error if courier id exist', async () => {
      expect(() => service.remove('5')).toThrowError();
    });
  });
});
