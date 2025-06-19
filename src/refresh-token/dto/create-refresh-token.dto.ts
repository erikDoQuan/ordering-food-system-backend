export class CreateRefreshTokenDto {
  userId: string;
  token: string;
  createdByIp: string;
  userAgent?: string;
  expiresAt: Date;
}