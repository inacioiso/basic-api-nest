import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { DisciplineModule } from './discipline/discipline.module';
import { CriteriaModule } from './criteria/criteria.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    DisciplineModule,
    CriteriaModule,
    AdminModule,
  ],
})
export class AppModule {}
