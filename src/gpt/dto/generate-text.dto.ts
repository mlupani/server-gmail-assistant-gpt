import { IsOptional, IsString, MinLength } from 'class-validator';

export class GenerateTextDto {
  @IsString()
  @MinLength(3)
  prompt: string;

  @IsString()
  @IsOptional()
  systemPrompt?: string;
}
