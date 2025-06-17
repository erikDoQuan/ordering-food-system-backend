import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from 'src/entities/dish.entity';
import { Repository } from 'typeorm';
import { CreateDishDto } from 'src/dto/create-dish.dto';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish)
    private repo: Repository<Dish>,
  ) {}

  create(dto: CreateDishDto) {
    const dish = this.repo.create(dto);
    return this.repo.save(dish);
  }

  findAll() {
    return this.repo.find({ relations: ['category'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['category'] });
  }

  async update(id: number, dto: CreateDishDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
