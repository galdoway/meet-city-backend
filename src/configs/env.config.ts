import * as Joi from 'joi';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export interface EnvConfig {
  [key: string]: string;
}

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(...Object.values(Environment))
    .default(Environment.Development),
  PORT: Joi.number().default(3000),
  API_BASE_URL: Joi.string().default('http://localhost:3000'),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required().default(5432),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_SCHEMA: Joi.string().default('public'),
  DATABASE_SSL: Joi.boolean().default(false),
  JWT_ACCESS_TOKEN_PRIVATE_KEY: Joi.string().required(),
  JWT_ACESS_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string().default('3d'),
});
