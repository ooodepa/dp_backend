import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';

import { AppModule } from './app.module';
import SwaggerConfig from './swagger.config';
import HttpResponseDto from './dto/http-response.dto';
import getStatusByCode from './utils/getStatusByCode';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const code = HttpStatus.BAD_REQUEST;
        const errorResponse: HttpResponseDto = {
          code: code,
          status: getStatusByCode(code),
          message: '',
        };

        const array = [];
        errors.forEach((error) => {
          const messages = error.constraints
            ? Object.values(error.constraints)
            : ['Validation failed'];

          array.push(...messages);
        });

        errorResponse.message = array[0];

        const message = array[0];
        errorResponse.message = message;
        throw new HttpException(errorResponse, code);

        // return errorResponse;
      },
    }),
  );

  const SWAGGER_URL = process.env.APP_SWAGGER_URL || '/api';
  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup(SWAGGER_URL, app, document);
  fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));

  const APP_PORT = Number(process.env.APP_PORT) || 3000;
  await app.listen(APP_PORT, () => {
    console.log(`NodeJS started: http://localhost:${APP_PORT}/api`);
    console.log(`SwaggerUI: http://localhost:${APP_PORT}${SWAGGER_URL}`);
  });
}
bootstrap();
