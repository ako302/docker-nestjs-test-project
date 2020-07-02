import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const DB_PORT: number = parseInt(process.env.DB_PORT || '5432');
const DB_TYPE: any = process.env.DB_TYPE || 'postgres';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: DB_TYPE,
  host: process.env.DB_HOSTNAME,
  port: DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
