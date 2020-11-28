import { Reflector } from '@nestjs/core'
jest.mock('@nestjs/core')
import { RateLimiterInterceptor } from './rate-limiter.interceptor'
import { RateLimiterOptions } from './rate-limiter.interface'
import { defaultRateLimiterOptions } from './default-options'

describe('RateLimiterInterceptor', () => {
	it('should validate that RateLimiterInterceptor class exists', async () => {
		expect(RateLimiterInterceptor).toBeDefined()
	})

	it('should create the RateLimiterInterceptor' , async () => {
		
		const rateLimiterOptions: RateLimiterOptions = defaultRateLimiterOptions;
		const reflector = new Reflector();

		const interceptor:RateLimiterInterceptor = new RateLimiterInterceptor(rateLimiterOptions,reflector );

		expect( interceptor ).toBeDefined();
		
	})
})
