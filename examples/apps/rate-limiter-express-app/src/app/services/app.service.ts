import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getData(): Promise<{ message: string }>  {
      return new Promise( resolve => {
        return resolve({message:'Welcome to rate-limiter-express-app!'});
      })
  }

  async getLongData( timeout: number): Promise<{ message: string }>  {

    try{
      return new Promise( resolve => {

        setTimeout( () => {
          return resolve({message:'Welcome to rate-limiter-express-app!'});
        }, timeout);
        
      })
    }catch(err){
      throw err;
    }
  }

}