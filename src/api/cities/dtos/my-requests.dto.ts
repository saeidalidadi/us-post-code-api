import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class MyRequestsQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(Infinity)
  @Transform(({ value, obj }) => Number(obj.page.valueOf()))
  page: number = 1;
}
