import { Controller, Get } from '@nestjs/common';

import { AppService } from '../services/app.service';
import { RateLimit } from '../../../../../../dist';


// Need to set the Max Queue.  It is a combination of duration and MAX Queue size that will throgh the error
// 1. queueEnabled
// -- queueEnabled
// -- duration
// 2. maxQueueSize
// -- queueEnabled
// -- duration
// -- maxQueueSize
// --- Should return 429 errorCode once exceeds
// 3. blockDuration
// -- duration
// -- pointsConsumed
// -- blockDuration
// 4.  duration
// -- pointsConsumed
// -- duration
// 5. inmemoryBlockDuration

@Controller('queue')
export class QueueController {
  constructor(private readonly appService: AppService) {}

  @RateLimit({
    points: 3,
    duration: 2,
    queueEnabled: false,
    errorMessage: 'Accounts cannot be created more than once in per minute' })
  @Get('/disabled')
  async getQueueDisabled() {
    try{
      const resp = await this.appService.getData();
      return resp;
    }catch(err){
      throw err;
    }
  }

  @RateLimit({
    duration: 1,
    maxQueueSize: 4,
    queueEnabled: true,
    errorMessage: 'Accounts cannot be created more than once in per minute' })
  @Get('/enabled')
  async getQueueEnabled() {
    try{
      const resp = await this.appService.getData();
      return resp;
    }catch(err){
      throw err;
    }
  }

  @RateLimit({
    duration: 2,
    queueEnabled: true,
    errorMessage: 'Accounts cannot be created more than once in per minute' })
  @Get('/enabledlong')
  async getQueueEnabledLong() {
    try{
      const resp = await this.appService.getData();
      return resp;
    }catch(err){
      throw err;
    }
  }
}


// testQueueLongEnabled