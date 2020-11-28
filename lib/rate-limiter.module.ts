import { Module, DynamicModule, Provider } from '@nestjs/common'
import { defaultRateLimiterOptions } from './default-options'
import { RateLimiterOptions, RateLimiterModuleAsyncOptions, RateLimiterOptionsFactory } from './rate-limiter.interface'

@Module({
	exports: ['RATE_LIMITER_OPTIONS'],
	providers: [{ provide: 'RATE_LIMITER_OPTIONS', useValue: defaultRateLimiterOptions }]
})
export class RateLimiterModule {
	static register(options: RateLimiterOptions = defaultRateLimiterOptions): DynamicModule {
		return {
			module: RateLimiterModule,
			providers: [{ provide: 'RATE_LIMITER_OPTIONS', useValue: options }]
		}
	}

	static registerAsync(options: RateLimiterModuleAsyncOptions): DynamicModule {
		return {
			module: RateLimiterModule,
			imports: options.imports,
			providers: [...this.createAsyncProviders(options), ...(options.extraProviders || [])]
		}
	}

	private static createAsyncProviders(options: RateLimiterModuleAsyncOptions): Provider[] {
		/* istanbul ignore next */
		if (options.useExisting || options.useFactory) {
			/* istanbul ignore next */
			return [this.createAsyncOptionsProvider(options)]
		}
		return [
			this.createAsyncOptionsProvider(options),
			{
				provide: options.useClass,
				useClass: options.useClass
			}
		]
	}

	private static createAsyncOptionsProvider(options: RateLimiterModuleAsyncOptions): Provider {
		/* istanbul ignore next */
		if (options.useFactory) {
			/* istanbul ignore next */
			return {
				provide: 'RATE_LIMITER_OPTIONS',
				useFactory: options.useFactory,
				inject: options.inject || []
			}
		}
		/* istanbul ignore next */
		return {
			provide: 'RATE_LIMITER_OPTIONS',
			useFactory: async (optionsFactory: RateLimiterOptionsFactory) => optionsFactory.createRateLimiterOptions(),
			inject: [options.useExisting || options.useClass]
		}
	}
}
