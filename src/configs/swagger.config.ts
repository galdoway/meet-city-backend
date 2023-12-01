import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
	.setTitle('Meet City - API')
	.setDescription(
		'API for Meet City: A Platform for real time communication...',
	)
	.setVersion(process.env.npm_package_version || '1.0.0')
	.addServer(
		process.env.API_SERVER_BASE_URL || 'http://localhost:3000',
		'API Server URL',
	)
	.addBearerAuth()
	.build();
