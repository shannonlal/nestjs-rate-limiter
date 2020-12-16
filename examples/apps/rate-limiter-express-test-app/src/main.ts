import { testBelowMaximumPoints, testExceedingMaximumPoints, testQueueDisabled, testQueueEnabled, testQueueLongEnabled } from '@examples/rate-limiter-points-test';
import * as assert from 'assert';

const BASE_URL  = 'http://localhost:3333/api';

const execute = async () => {
    try{
        assert (await testBelowMaximumPoints(BASE_URL) );


        assert (await testExceedingMaximumPoints(BASE_URL) );

        assert (await testQueueDisabled(BASE_URL) );

        assert (await testQueueEnabled(BASE_URL));

        assert (await testQueueLongEnabled(BASE_URL));
        process.exit(1);
    }catch(err){
        process.exit(1);
    }
}

execute();

