import { IsNumber, IsOptional, IsString } from 'class-validator';
export class CreateEmployeeRequestDto {
  @IsString()
  first_name!: string;

  @IsString()
  last_name!: string;

  @IsString()
  alias!: string;

  @IsNumber()
  @IsOptional()
  team?: number;
}
