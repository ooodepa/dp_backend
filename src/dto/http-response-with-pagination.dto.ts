import HttpResponseDto from './http-response.dto';

export default class HttpResponseWithPagination extends HttpResponseDto {
  pagination: {
    current_page: number;
    last_page: number;
    total_entities: number;
    limit_entities: number;
    skip_entities: number;
  };
}
