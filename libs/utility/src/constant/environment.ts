import { Logger } from '@nestjs/common';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';
import * as dotenv from 'dotenv';
dotenv.config();

enum Environment {
  Local = 'local',
  Development = 'development',
  Test = 'test',
  Production = 'production',
}

class EnvironmentVariables {
  private readonly logger = new Logger(EnvironmentVariables.name);

  @IsString()
  readonly APPNAME: string = process.env['APPNAME'] as string;

  @IsEnum(Environment)
  readonly NODE_ENV: Environment = process.env['NODE_ENV'] as Environment;

  @IsNumber()
  readonly PORT: number = Number(process.env['PORT']);

  @IsString()
  readonly JWT_ACCESS_SECRET: string = process.env['JWT_ACCESS_SECRET'] as string;

  @IsNumber()
  readonly JWT_ACCESS_EXPIRE: number = Number(process.env['JWT_ACCESS_EXPIRE']);

  @IsString()
  readonly JWT_REFRESH_SECRET: string = process.env['JWT_REFRESH_SECRET'] as string;

  @IsNumber()
  readonly JWT_REFRESH_EXPIRE: number = Number(process.env['JWT_REFRESH_EXPIRE']);

  @IsString()
  readonly REDIS_HOST: string = process.env['REDIS_HOST'] as string;

  @IsNumber()
  readonly REDIS_PORT: number = Number(process.env['REDIS_PORT']);

  @IsString()
  readonly REDIS_USERNAME: string = process.env['REDIS_USERNAME'] as string;

  @IsString()
  readonly REDIS_PASSWORD: string = process.env['REDIS_PASSWORD'] as string;

  @IsString()
  readonly POSTGRES_HOST: string = process.env['POSTGRES_HOST'] as string;

  @IsNumber()
  readonly POSTGRES_PORT: number = Number(process.env['POSTGRES_PORT']);

  @IsString()
  readonly POSTGRES_DB: string = process.env['POSTGRES_DB'] as string;

  @IsString()
  readonly POSTGRES_USER: string = process.env['POSTGRES_USER'] as string;

  @IsString()
  readonly POSTGRES_PASSWORD: string = process.env['POSTGRES_PASSWORD'] as string;

  @IsString()
  readonly CERBOS_HOST: string = process.env['CERBOS_HOST'] as string;

  @IsString()
  readonly CERBOS_PORT: string = process.env['CERBOS_PORT'] as string;

  @IsString()
  readonly CERBOS_USERNAME: string = process.env['CERBOS_USERNAME'] as string;

  @IsString()
  readonly CERBOS_PASSWORD: string = process.env['CERBOS_PASSWORD'] as string;

  @IsString()
  readonly RMQ_USER: string = process.env['RMQ_USER'] as string;

  @IsString()
  readonly RMQ_PASSWORD: string = process.env['RMQ_PASSWORD'] as string;

  @IsString()
  readonly RMQ_HOST: string = process.env['RMQ_HOST'] as string;

  @IsNumber()
  readonly RMQ_PORT: number = Number(process.env['RMQ_PORT']);

  constructor() {
    const error = validateSync(this);
    if (!error.length) return;
    this.logger.error(`Config validation error: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}

export const environment = new EnvironmentVariables();
