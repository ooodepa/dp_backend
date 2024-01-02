import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export default class LanguageDto {
  @ApiProperty()
  @IsString()
  @MaxLength(2)
  @MinLength(2)
  dp_shortName: string;
}
