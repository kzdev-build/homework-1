import { Injectable } from '@nestjs/common';
import { CreateCourierDto } from './dto/create-courier.dto';
import { UpdateCourierDto } from './dto/update-courier.dto';
import { Courier } from './entities/courier.entity';

@Injectable()
export class CouriersService {
  private couriers: Array<Courier> = [];

  findAll(): Array<Courier> {
    return this.couriers;
  }

  findCouriersWithAvailableSpace(capacity: number): Array<Courier> {
    return this.couriers.filter((c) => c.max_capacity >= capacity);
  }

  findOne(id: string) {
    const res = this.couriers.find((c) => c.id == id);

    if (!res) throw new Error(`Courier with id ${id} not found`);

    return res;
  }

  create(createCourierDto: CreateCourierDto): Courier {
    if (this.couriers.find((c) => c.id === createCourierDto.id))
      throw new Error(
        `You can not create another courier with id ${createCourierDto.id}`,
      );

    const newCouriers = { ...createCourierDto };
    this.couriers.push(newCouriers);

    return newCouriers;
  }

  update(id: string, updateCourierDto: UpdateCourierDto): Courier {
    const position = this.couriers.findIndex((c) => c.id === id);
    if (position < 0) throw new Error(`Courier with id ${id} not found`);

    this.couriers[position].max_capacity = updateCourierDto.max_capacity;

    return this.couriers[position];
  }

  remove(id: string): void {
    const position = this.couriers.findIndex((c) => c.id === id);
    if (position < 0) throw new Error(`Courier with id ${id} not found`);

    this.couriers.splice(position, 1);
  }
}
