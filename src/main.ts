import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './configs';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1',
	});
	app.useGlobalPipes(
		new ValidationPipe({
			forbidNonWhitelisted: true,
			whitelist: true,
		}),
	);
	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup('docs', app, document, {
		swaggerOptions: {
			persistAuthorization: true,
		},
	});
	fs.writeFile(
		'./dist/swagger-spec.json',
		JSON.stringify(document),
		() => ({}),
	);
	await app.listen(3000);
}
bootstrap();
