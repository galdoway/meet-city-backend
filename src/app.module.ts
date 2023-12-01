import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './configs/';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validationSchema,
			expandVariables: true,
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
