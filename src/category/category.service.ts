import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './enitities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private repo: Repository<Category>,
  ) {}

  create(dto: CreateCategoryDto) {
    const category = this.repo.create(dto);
    return this.repo.save(category);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, dto: CreateCategoryDto) {
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
}
