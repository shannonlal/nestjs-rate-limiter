import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  AppController,
  PointsController,
  QueueController,
  BlackWhiteController,
  KeyPrefixController 
} from './controllers';
import { AppService } from './services/app.service';
import { RateLimiterModule, RateLimiterInterceptor } from '../../../../../dist';

@Module({
  imports: [RateLimiterModule],
  controllers: [
    AppController,
    PointsController,
    QueueController,
    BlackWhiteController,
    KeyPrefixController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RateLimiterInterceptor,
  }
  ],
})
export class AppModule {}
