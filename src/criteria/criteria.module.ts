import { Module } from '@nestjs/common';
import { CriteriaController } from './criteria.controller';
import { CriteriaService } from './criteria.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [CriteriaController],
  providers: [CriteriaService, JwtStrategy],
  imports: [DatabaseModule],
})
export class CriteriaModule {}
