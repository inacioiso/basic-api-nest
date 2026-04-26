import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DatabaseModule } from '../database/database.module';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  controllers: [AdminController],
  providers: [AdminService, JwtStrategy],
  imports: [DatabaseModule]
})
export class AdminModule {}
