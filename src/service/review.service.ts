import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from 'src/dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private repo: Repository<Review>,
  ) {}

  create(dto: CreateReviewDto) {
    const review = this.repo.create(dto);
    return this.repo.save(review);
  }

  findAll() {
    return this.repo.find({ relations: ['user', 'dish'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['user', 'dish'] });
  }

  async update(id: number, dto: CreateReviewDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
