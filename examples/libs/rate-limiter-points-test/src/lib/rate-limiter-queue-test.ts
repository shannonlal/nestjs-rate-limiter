import { runLoadTest, LoadTestResponse, LoadTestOptions, wait } from '@examples/loadtest-common';
import { watchFile } from 'fs';

const POINTS_CONSUMED_ROUTE = '/queue';

export const testQueueDisabled = async ( url: string): Promise<boolean> => {
  const options: LoadTestOptions  = {
    url: `${url}${POINTS_CONSUMED_ROUTE}/disabled`,
    maxRequests: 5,
    maxSeconds: 2,
    timeout: 300
  };
  try{
    await wait(2000);
    const response: LoadTestResponse = await runLoadTest( options );

    console.log( 'Queue Response', response);

    return (response.totalRequests === 5 && response.totalErrors === 2 );
  }catch( err ){
    // tslint:disable-next-line: no-console
    console.log( `Unexpected error testing points consumed ${err}`)
    return false;
  }
}

export const testQueueEnabled = async ( url: string): Promise<boolean> => {
  const options: LoadTestOptions  = {
    url: `${url}${POINTS_CONSUMED_ROUTE}/enabled`,
    maxRequests: 5,
    maxSeconds: 1,
    timeout: 1100
  };
  try{
    await wait(2000);
    const response: LoadTestResponse = await runLoadTest( options );

    console.log( 'Queue Enabled Response', response);

    return (response.totalRequests === 5 && response.totalErrors === 0 );
  }catch( err ){
    // tslint:disable-next-line: no-console
    console.log( `Unexpected error testing points consumed ${err}`)
    return false;
  }
}

export const testQueueLongEnabled = async ( url: string): Promise<boolean> => {
  const options: LoadTestOptions  = {
    url: `${url}${POINTS_CONSUMED_ROUTE}/enabledlong`,
    maxRequests: 4,
    maxSeconds: 3,
    timeout: 3000
  };
  try{
    await wait(2000);
    const response: LoadTestResponse = await runLoadTest( options );

    console.log( 'Queue Long Enabled Response', response);

    return (response.totalRequests === 5 && response.totalErrors === 0 );
  }catch( err ){
    // tslint:disable-next-line: no-console
    console.log( `Unexpected error testing points consumed ${err}`)
    return false;
  }
}

