import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as path from 'path';

const config: Options = {
  host: 'postgres',
  port: 5432,
  user: 'admin',
  type: 'postgresql',
  password: 'admin',
  dbName: 'esport',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['./src/**/model/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: path.join(__dirname, './database/migrations'),
    pathTs: path.join(__dirname, './database/migrations'),
  },
  seeder: {
    path: path.join(__dirname, './database/seeds'),
    pathTs: path.join(__dirname, './database/seeds'),
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
};

export default config;
