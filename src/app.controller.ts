import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-user')
  async createTestUser() {
    const user = this.userRepository.create({
      first_name: 'Minh',
      last_name: 'Quân',
      email: 'minhquan@gmail.com',
      password: '123456',
      phone: '0123456789',
      address_line: '123 Lê Lợi, Nha Trang',
      is_active: true,
    });

    return await this.userRepository.save(user);
  }
}
