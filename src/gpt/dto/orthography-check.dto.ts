import { IsNumber, IsOptional, IsString } from 'class-validator';

export class OrthographyCheckDto {
  @IsString()
  prompt: string;

  @IsNumber()
  @IsOptional()
  maxTokens: number;
}
