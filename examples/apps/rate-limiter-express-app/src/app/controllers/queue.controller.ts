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
    points: 10,
    pointsConsumed:1,
    duration: 2,
    maxQueueSize: 10,
    queueEnabled: true,
    errorMessage: 'Accounts cannot be created more than once in per minute' })
  @Get('/enabled')
  async getQueueEnabled() {
    try{
      const resp = await this.appService.getData();
      console.log( 'Got a response', resp);
      return resp;
    }catch(err){
      throw err;
    }
  }

  @RateLimit({
    duration: 10,
    maxQueueSize: 10,
    queueEnabled: true,
    errorMessage: 'Not enough space on the queue' })
  @Get('/toosmall')
  async getQueueTooSmall() {
    try{
      const resp = await this.appService.getData();
      return resp;
    }catch(err){
      throw err;
    }
  }

  @RateLimit({
    blackList:['1'],
    errorMessage: 'IP Addresss Has been black listed' })
  @Get('/blacklist')
  async blockLocalOnly() {
    try{
      console.log( 'IP Address')
      const resp = await this.appService.getData();
      return resp;
    }catch(err){
      throw err;
    }
  }

  @RateLimit({
    points:1,
    duration:10,
    whiteList:['192.168.0.101'],
    errorMessage: 'IP Addresss Has been black listed' })
  @Get('/whitelist')
  async allowLocal() {
    try{
      console.log( 'Allow Traffic')
      const resp = await this.appService.getData();
      return resp;
    }catch(err){
      throw err;
    }
  }
}


// testQueueLongEnabled