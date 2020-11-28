import { Reflector } from '@nestjs/core'
jest.mock('@nestjs/core')

import { NestInterceptor, Injectable, ExecutionContext, CallHandler, Inject, HttpStatus, Logger, HttpException } from '@nestjs/common'
import { RateLimiterInterceptor } from './rate-limiter.interceptor'
import { RateLimiterOptions } from './rate-limiter.interface'
import { defaultRateLimiterOptions } from './default-options'

describe('RateLimiterInterceptor', () => {

	describe('Constructor', ()=> {
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

	describe('intercept', ()=> {
		it('should validate that intercept method exists', async () => {
			const rateLimiterOptions: RateLimiterOptions = defaultRateLimiterOptions;
			const reflector = new Reflector();
	
			const interceptor:RateLimiterInterceptor = new RateLimiterInterceptor(rateLimiterOptions,reflector );
	
			expect( interceptor.intercept ).toBeDefined();
		})

	})
})
