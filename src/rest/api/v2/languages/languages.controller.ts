import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import catchService from 'src/utils/catchService';
import PaginationQuery from 'src/dto/pagination-query.dto';

import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { CreateBulkLanguageDto } from './dto/create-bulk-language.dto';
import { UpdateBulkLanguageDto } from './dto/update-bulk-language.dto';

@ApiTags('api_v2_languages')
@Controller('v2/languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR })
  @Post('bulk')
  createBulk(@Body() dto: CreateBulkLanguageDto) {
    return this.languagesService.createBulk(dto.bulk).catch(catchService);
  }

  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR })
  @Post()
  create(@Body() dto: CreateLanguageDto) {
    return this.languagesService.create(dto).catch(catchService);
  }

  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR })
  @Get()
  findAll(@Query() query: PaginationQuery) {
    return this.languagesService.findAll(query).catch(catchService);
  }

  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.languagesService.findOne(+id).catch(catchService);
  }

  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR })
  @Patch('bulk')
  updateBulk(@Body() dto: UpdateBulkLanguageDto) {
    return this.languagesService.updateBulk(dto.bulk).catch(catchService);
  }

  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLanguageDto) {
    return this.languagesService.update(+id, dto).catch(catchService);
  }

  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languagesService.remove(+id).catch(catchService);
  }
}
