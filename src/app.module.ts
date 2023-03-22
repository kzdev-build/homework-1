import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CouriersModule } from './couriers/couriers.module';

@Module({
  imports: [CouriersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
