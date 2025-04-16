import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @IsString()
  @IsOptional()
  status?: string;
}