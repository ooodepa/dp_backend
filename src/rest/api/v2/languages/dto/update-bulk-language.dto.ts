import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

import { LanguageWithIdDto } from './language-with-id';

export class UpdateBulkLanguageDto {
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => LanguageWithIdDto)
  @ApiProperty({ type: [LanguageWithIdDto] })
  bulk: LanguageWithIdDto[];
}
