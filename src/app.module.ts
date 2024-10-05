import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { PersistenceModule } from './persistence/persistence.module';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ApiModule,
    InfrastructureModule,
    PersistenceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
