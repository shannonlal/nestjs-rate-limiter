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
    maxRequests: 10,
    maxSeconds: 4,
    timeout: 1000
  };
  try{
    await wait(2000);
    const response: LoadTestResponse = await runLoadTest( options );

    console.log( 'Queue Enabled Response', response);

    return (response.totalRequests === 10 && response.totalErrors === 0 );
  }catch( err ){
    // tslint:disable-next-line: no-console
    console.log( `Unexpected error testing points consumed ${err}`)
    return false;
  }
}

export const testQueueTooSmall = async ( url: string): Promise<boolean> => {
  const options: LoadTestOptions  = {
    url: `${url}${POINTS_CONSUMED_ROUTE}/toosmall`,
    maxRequests: 20,
    maxSeconds: 3,
    concurrency: 20,
    requestsPerSecond: 30,
    timeout: 100
  };
  try{
    // await wait(2000);
    const response: LoadTestResponse = await runLoadTest( options );

    console.log( 'Queue Long Enabled Response', response);

    return (response.totalRequests === 5 && response.totalErrors === 0 );
  }catch( err ){
    // tslint:disable-next-line: no-console
    console.log( `Unexpected error testing points consumed ${err}`)
    return false;
  }
}

