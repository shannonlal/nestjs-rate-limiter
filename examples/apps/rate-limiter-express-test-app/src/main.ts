import {
    testBelowMaximumPoints,
    testExceedingMaximumPoints,
    testQueueDisabled,
    testQueueEnabled,
    testQueueTooSmall,
    testBlockLocalhost,
    testBlockNonLocalhost,
    testWhiteListLocalhost,
    testRestrictLocalhost,
    testGlobalKeyprefix,
    testUniqueKeyprefix } from '@examples/rate-limiter-points-test';
import * as assert from 'assert';

const BASE_URL  = 'http://localhost:3333/api';

const execute = async () => {
    try{
        assert (await testBelowMaximumPoints(BASE_URL) );

        assert (await testExceedingMaximumPoints(BASE_URL) );
        
        assert (await testQueueDisabled(BASE_URL) );

        assert (await testQueueEnabled(BASE_URL));

        assert (await testQueueTooSmall(BASE_URL));

        assert ( await testBlockLocalhost(BASE_URL));

        assert ( await testBlockNonLocalhost(BASE_URL));

        assert( await testWhiteListLocalhost(BASE_URL));

        assert( await testRestrictLocalhost(BASE_URL));

        assert( await testGlobalKeyprefix(BASE_URL));

        assert( await testUniqueKeyprefix(BASE_URL));
        console.log('Test Completed');

        process.exit(1);
    }catch(err){
        process.exit(1);
    }
}

execute();

