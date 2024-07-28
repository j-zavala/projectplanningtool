import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

// Explicitly load environment variables
dotenvConfig({ path: '.env' });

const isProduction = process.env.NODE_ENV === 'production';

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [isProduction ? 'dist/**/*.entity.js' : 'src/**/*.entity.ts'],
  migrations: [isProduction ? 'dist/migrations/*.js' : 'src/migrations/*.ts'],
  synchronize: false,
  logging: true,
  ssl: process.env.DB_SSL === 'true',
  extra: {
    ssl:
      process.env.DB_SSL === 'true'
        ? {
            rejectUnauthorized: false,
          }
        : null,
  },
};

export default registerAs('typeorm', (): DataSourceOptions => config);
export const AppDataSource = new DataSource(config);
