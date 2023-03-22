import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  ParseIntPipe,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CouriersService } from './couriers.service';
import { CreateCourierDto } from './dto/create-courier.dto';
import { UpdateCourierDto } from './dto/update-courier.dto';

@ApiTags('couriers')
@Controller('couriers')
export class CouriersController {
  constructor(private readonly couriersService: CouriersService) {}

  @Get()
  findAll() {
    return this.couriersService.findAll();
  }

  @Get('/lookup')
  findCouriersWithAvailableSpace(
    @Query('capacity_required', ParseIntPipe) capacity: number,
  ) {
    return this.couriersService.findCouriersWithAvailableSpace(capacity);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.couriersService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  create(@Body(new ValidationPipe()) createCourierDto: CreateCourierDto) {
    try {
      return this.couriersService.create(createCourierDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateCourierDto: UpdateCourierDto,
  ) {
    try {
      return this.couriersService.update(id, updateCourierDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.couriersService.remove(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
