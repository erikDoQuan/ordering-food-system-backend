
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepo: Repository<RefreshToken>,
  ) {}

  async create(dto: CreateRefreshTokenDto, user: User): Promise<RefreshToken> {
    const token = this.refreshTokenRepo.create({
      token: dto.token,
      createdByIp: dto.createdByIp,
      userAgent: dto.userAgent,
      user,
      expiresAt: dto.expiresAt,
    });
    return this.refreshTokenRepo.save(token);
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return this.refreshTokenRepo.findOne({
      where: { token },
      relations: ['user'],
    });
  }

  async revoke(token: string, revokedByIp: string): Promise<void> {
    const existingToken = await this.findByToken(token);
    if (existingToken) {
      existingToken.revokedAt = new Date();
      existingToken.revokedByIp = revokedByIp;
      await this.refreshTokenRepo.save(existingToken);
    }
  }

  async deleteByUser(userId: string): Promise<void> {
    await this.refreshTokenRepo.delete({ user: { id: userId } });
  }
}
