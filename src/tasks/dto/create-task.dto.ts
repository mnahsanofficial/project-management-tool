import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  project: string;

  @IsDateString()
  @IsOptional()
  dueDate?: Date;
}