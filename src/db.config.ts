import * as path from 'path';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config({
  path: path.join('./.env'),
});

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [path.join('dist', '**', '*.entity.js')],
  migrations: [path.join('dist', 'migration', '*.js')],
  migrationsTableName: 'DP_migrations',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
