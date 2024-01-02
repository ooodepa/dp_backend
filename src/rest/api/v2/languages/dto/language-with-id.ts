import { ApiProperty, PartialType } from '@nestjs/swagger';

import LanguageDto from './language.dto';

export class LanguageWithIdDto extends PartialType(LanguageDto) {
  @ApiProperty()
  dp_id: number;
}
