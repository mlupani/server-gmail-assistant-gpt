import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProsConsDiscusserDto {
  @IsString()
  prompt: string;

  @IsNumber()
  @IsOptional()
  maxTokens: number;
}
