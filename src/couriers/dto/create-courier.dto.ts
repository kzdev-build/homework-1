import { Min, MinLength } from 'class-validator';

export class CreateCourierDto {
  @MinLength(4)
  id: string;
  @Min(0)
  max_capacity: number;
}
