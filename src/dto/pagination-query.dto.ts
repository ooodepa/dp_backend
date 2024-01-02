import { ApiProperty } from '@nestjs/swagger';

export default class PaginationQuery {
  @ApiProperty({
    required: false,
  })
  limit: number;

  @ApiProperty({ required: false })
  page: number;
}
