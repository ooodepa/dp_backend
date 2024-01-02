import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import LanguageDto from './dto/language.dto';
import HttpResponseDto from 'src/dto/http-response.dto';
import getStatusByCode from 'src/utils/getStatusByCode';
import PaginationQuery from 'src/dto/pagination-query.dto';
import { LanguageWithIdDto } from './dto/language-with-id';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import LanguageEntity from 'src/entity/DP_CTL_Languages.entity';
import HttpResponseWithPagination from 'src/dto/http-response-with-pagination.dto';

@Injectable()
export class LanguagesService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(LanguageEntity)
    private readonly languageRepo: Repository<LanguageEntity>,
  ) {}

  async createBulk(bulk: LanguageDto[]) {
    const ENTITIES = await this.languageRepo.insert(
      bulk.map((e) => ({
        ...e,
        dp_id: undefined,
      })),
    );

    const CODE = HttpStatus.CREATED;
    const HTTP_RESPONSE: HttpResponseDto = {
      code: CODE,
      status: getStatusByCode(CODE),
      message: 'Создали несколько сущностей',
      response: ENTITIES,
    };

    throw new HttpException(HTTP_RESPONSE, CODE);
  }

  async create(dto: CreateLanguageDto) {
    const ENTITY = await this.languageRepo.save(dto);

    const CODE = HttpStatus.CREATED;
    const HTTP_RESPONSE: HttpResponseDto = {
      code: CODE,
      status: getStatusByCode(CODE),
      message: 'Создали одну сущность',
      response: ENTITY,
    };

    throw new HttpException(HTTP_RESPONSE, CODE);
  }

  async findAll(query: PaginationQuery) {
    const CURRENT_PAGE = Number(query.page) || 1;
    const LIMIT_ENTITIES = Number(query.limit) || 100;
    const SKIP_ENTITIES = (CURRENT_PAGE - 1) * LIMIT_ENTITIES;

    const [ENTITIES, TOTAL_ENTITIES] = await this.languageRepo.findAndCount({
      skip: SKIP_ENTITIES,
      take: LIMIT_ENTITIES,
      order: { dp_id: 'ASC' },
    });
    const LAST_PAGE = Math.ceil(TOTAL_ENTITIES / LIMIT_ENTITIES);

    const CODE = HttpStatus.OK;
    const HTTP_RESPONSE_WITH_PAGINATION: HttpResponseWithPagination = {
      code: CODE,
      status: getStatusByCode(CODE),
      message: 'Получили несколько сущностей',
      pagination: {
        current_page: CURRENT_PAGE,
        last_page: LAST_PAGE,
        total_entities: TOTAL_ENTITIES,
        limit_entities: LIMIT_ENTITIES,
        skip_entities: SKIP_ENTITIES,
      },
      response: ENTITIES,
    };

    throw new HttpException(HTTP_RESPONSE_WITH_PAGINATION, CODE);
  }

  async findOne(id: number) {
    const ENTITY = await this.languageRepo.findOne({
      where: {
        dp_id: id,
      },
    });

    const CODE = HttpStatus.OK;
    const HTTP_RESPONSE: HttpResponseDto = {
      code: CODE,
      status: getStatusByCode(CODE),
      message: 'Получили сущность по id',
      response: ENTITY,
    };

    throw new HttpException(HTTP_RESPONSE, CODE);
  }

  async updateBulk(bulk: LanguageWithIdDto[]) {
    console.log(bulk);
    const candidates = await this.languageRepo.find({
      where: {
        dp_id: In(bulk.map((e) => e.dp_id)),
      },
    });

    if (bulk.length !== candidates.length) {
      const CODE = HttpStatus.NOT_FOUND;
      const HTTP_RESPONSE: HttpResponseDto = {
        code: CODE,
        status: getStatusByCode(CODE),
        message: 'Не все записи есть по id для их обновления',
        response: candidates,
      };
      throw new HttpException(HTTP_RESPONSE, CODE);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (let i = 0; i < bulk.length; ++i) {
        const id = bulk[i].dp_id;
        bulk[i].dp_id = undefined;
        await queryRunner.manager
          .getTreeRepository(LanguageEntity)
          .update(id, bulk[i]);
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      const CODE = HttpStatus.BAD_REQUEST;
      const HTTP_RESPONSE: HttpResponseDto = {
        code: CODE,
        status: getStatusByCode(CODE),
        message: '' + err,
        response: candidates,
      };
      throw new HttpException(HTTP_RESPONSE, CODE);
    } finally {
      await queryRunner.release();
    }

    const CODE = HttpStatus.OK;
    const HTTP_RESPONSE: HttpResponseDto = {
      code: CODE,
      status: getStatusByCode(CODE),
      message: 'Записи обновлены',
    };
    throw new HttpException(HTTP_RESPONSE, CODE);
  }

  async update(id: number, dto: UpdateLanguageDto) {
    const RESULT = await this.languageRepo.update(id, {
      ...dto,
      dp_id: id,
    });

    if (RESULT.affected === 0) {
      const CODE = HttpStatus.NOT_FOUND;
      const HTTP_RESPONSE: HttpResponseDto = {
        code: CODE,
        status: getStatusByCode(CODE),
        message: 'Не найдена запись для обновления',
        response: RESULT,
      };
      throw new HttpException(HTTP_RESPONSE, CODE);
    }

    const CODE = HttpStatus.OK;
    const HTTP_RESPONSE: HttpResponseDto = {
      code: CODE,
      status: getStatusByCode(CODE),
      message: 'Обновили запись по id',
      response: RESULT,
    };
    throw new HttpException(HTTP_RESPONSE, CODE);
  }

  async remove(id: number) {
    const RESULT = await this.languageRepo.delete(id);

    if (RESULT.affected === 0) {
      const CODE = HttpStatus.NOT_FOUND;
      const HTTP_RESPONSE: HttpResponseDto = {
        code: CODE,
        status: getStatusByCode(CODE),
        message: 'Не найдена запись для удаления',
        response: RESULT,
      };
      throw new HttpException(HTTP_RESPONSE, CODE);
    }

    const CODE = HttpStatus.OK;
    const HTTP_RESPONSE: HttpResponseDto = {
      code: CODE,
      status: getStatusByCode(CODE),
      message: 'Удалили запись по id',
      response: RESULT,
    };
    throw new HttpException(HTTP_RESPONSE, CODE);
  }
}
