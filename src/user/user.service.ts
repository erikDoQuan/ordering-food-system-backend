import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './constant/user-role.constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.userRepo.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOneBy({ email });
  }

  async create(dto: CreateUserDto): Promise<User> {
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

  async update(id: string, dto: UpdateUserDto): Promise<User | null> {
    await this.userRepo.update({ id }, dto);
    return this.findOne(id);
  }

  // Xoá mềm (dùng cho admin xoá user)
  async softDelete(id: string): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }
    await this.userRepo.update({ id }, { is_active: false });
  }

  // Xoá mềm (user tự xoá account của mình)
  async remove(id: string): Promise<{ message: string }> {
    const user = await this.findOne(id);
    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }
    await this.userRepo.update({ id }, { is_active: false });
    return { message: 'Tài khoản của bạn đã bị xoá (mềm)' };
  }
}
