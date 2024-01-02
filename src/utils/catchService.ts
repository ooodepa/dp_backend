import { QueryFailedError } from 'typeorm';
import { HttpStatus, HttpException } from '@nestjs/common';

import getStatusByCode from './getStatusByCode';
import HttpResponseDto from 'src/dto/http-response.dto';

export default function catchService(err: any) {
  if (err instanceof HttpException) {
    return err.getResponse();
  }

  if (err instanceof QueryFailedError) {
    const CODE = HttpStatus.BAD_REQUEST;
    const HttpResponseDto: HttpResponseDto = {
      code: CODE,
      status: getStatusByCode(CODE),
      message: '' + err,
    };
    return HttpResponseDto;
  }

  const CODE = HttpStatus.INTERNAL_SERVER_ERROR;
  const HttpResponseDto: HttpResponseDto = {
    code: CODE,
    status: getStatusByCode(CODE),
    message: '' + err,
  };
  return HttpResponseDto;
}
