import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

import LanguageDto from './language.dto';

export class CreateBulkLanguageDto {
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => LanguageDto)
  @ApiProperty({ type: [LanguageDto] })
  bulk: LanguageDto[];
}
