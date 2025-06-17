import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from 'src/dish/entities/dish.entity';
import { Repository } from 'typeorm';
import { CreateDishDto } from 'src/dish/dto/create-dish.dto';

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

  async togglePublish(id: number, isActive: boolean) {
    await this.repo.update(id, { is_active: isActive });
    return this.findOne(id);
  }
  findAllPublished() {
    return this.repo.find({
      where: { is_active: true },
      relations: ['category'],
    });
  }

  findPublishedById(id: number) {
    return this.repo.findOne({
      where: { id, is_active: true },
      relations: ['category'],
    });
  }
}
