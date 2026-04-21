import { Module } from '@nestjs/common';
import { DisciplineController } from './discipline.controller';
import { DisciplineService } from './discipline.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [DisciplineController],
  providers: [DisciplineService, JwtStrategy],
  imports: [DatabaseModule]
})
export class DisciplineModule {}
