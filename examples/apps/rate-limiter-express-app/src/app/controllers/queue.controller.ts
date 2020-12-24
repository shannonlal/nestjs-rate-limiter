import { Controller, Get } from '@nestjs/common';

import { AppService } from '../services/app.service';
import { RateLimit } from '../../../../../../dist';

@Controller('queue')
export class QueueController {
  constructor(private readonly appService: AppService) {}

  @RateLimit({
    points: 3,
    duration: 2,
    queueEnabled: false,
    keyPrefix:'queue-disabled',
    errorMessage: 'Accounts cannot be created more than once in per minute' })
  @Get('/disabled')
  async getQueueDisabled() {
      const resp = await this.appService.getData();
      return resp;
  }

  @RateLimit({
    points: 10,
    pointsConsumed:1,
    duration: 2,
    maxQueueSize: 10,
    queueEnabled: true,
    keyPrefix:'queue-enabled',
    errorMessage: 'Accounts cannot be created more than once in per minute' })
  @Get('/enabled')
  async getQueueEnabled() {
      const resp = await this.appService.getData();
      console.log( 'Got a response', resp);
      return resp;
  }

  @RateLimit({
    maxQueueSize: 3,
    queueEnabled: true,
    keyPrefix:'queue-too-small',
    errorMessage: 'Not enough space on the queue' })
  @Get('/toosmall')
  async getQueueTooSmall() {
      const resp = await this.appService.getData();
      return resp;
  }
}
