import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './enitities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './constant/user-role.constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: string) {
    return this.userRepo.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  async create(dto: CreateUserDto) {
    try {
      const existingUser = await this.findByEmail(dto.email);
      if (existingUser) {
        throw new BadRequestException(
          'Email đã tồn tại hoặc dữ liệu không hợp lệ',
        );
      }

      if (!dto.role) {
        dto.role = UserRole.USER;
      }

      const user = this.userRepo.create(dto);
      return await this.userRepo.save(user);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Lỗi máy chủ khi tạo người dùng');
    }
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.userRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }
    return this.userRepo.delete(id);
  }
}
