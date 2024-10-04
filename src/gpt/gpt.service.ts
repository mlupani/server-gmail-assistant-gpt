import { Injectable } from '@nestjs/common';
import { orthrographyCheckUseCase } from './use-cases';
import { OrthographyCheckDto } from './dto';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async orthographyCheck(orthographyCheckDto: OrthographyCheckDto) {
    return await orthrographyCheckUseCase(this.openai, {
      prompt: orthographyCheckDto.prompt,
    });
  }
}
