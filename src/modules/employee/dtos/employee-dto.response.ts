import { IsNumber, IsObject, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class ResponseEmployeeDto {
  @IsNumber()
  @Expose()
  id!: number;

  @IsString()
  @Expose()
  first_name!: string;

  @IsString()
  @Expose()
  last_name!: string;

  @IsString()
  @Expose()
  alias!: string;

  @IsObject()
  private team!: object;
}
