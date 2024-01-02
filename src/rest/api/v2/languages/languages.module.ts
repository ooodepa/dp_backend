import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import LanguageEntity from 'src/entity/DP_CTL_Languages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageEntity])],
  controllers: [LanguagesController],
  providers: [LanguagesService],
})
export class LanguagesModule {}
