import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LanguagesModule } from './rest/api/v2/languages/languages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join('./.env'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [path.join('dist', '**', '*.entity.js')],
      logging: true,
      ...(process.env.NODE_ENV !== 'dev' ? { logger: 'file' } : {}),
      synchronize: false,
    }),
    LanguagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
