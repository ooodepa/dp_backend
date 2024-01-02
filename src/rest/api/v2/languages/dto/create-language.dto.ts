import { PartialType } from '@nestjs/swagger';

import LanguageDto from './language.dto';

export class CreateLanguageDto extends PartialType(LanguageDto) {}
