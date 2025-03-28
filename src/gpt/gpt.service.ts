import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { generateTextUseCase } from './use-cases';
import { GenerateTextDto } from './dto';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async generateText(generateTextDto: GenerateTextDto) {
    try {
      return await generateTextUseCase(this.openai, {
        prompt: generateTextDto.prompt,
        systemPrompt: generateTextDto.systemPrompt,
      });
    } catch {
      throw new InternalServerErrorException('Error generating text');
    }
  }
}
