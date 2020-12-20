import { testBelowMaximumPoints, testExceedingMaximumPoints, testQueueDisabled, testQueueEnabled, testQueueLongEnabled } from '@examples/rate-limiter-points-test';
import * as assert from 'assert';

const BASE_URL  = 'http://localhost:3333/api';

const execute = async () => {
    try{
        console.log( 'Starting Points Teset');
        assert (await testBelowMaximumPoints(BASE_URL) );

        assert (await testExceedingMaximumPoints(BASE_URL) );
        console.log( 'Completing Points Teset');
        assert (await testQueueDisabled(BASE_URL) );

        //assert (await testQueueEnabled(BASE_URL));

        //assert (await testQueueLongEnabled(BASE_URL));
        console.log( 'Completed Queue Tests');
        process.exit(1);
    }catch(err){
        process.exit(1);
    }
}

execute();

