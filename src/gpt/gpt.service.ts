import { Injectable } from '@nestjs/common';
import {
  orthrographyCheckUseCase,
  prosConsDiscusserUseCase,
  translateUseCase,
} from './use-cases';
import { OrthographyCheckDto, ProsConsDiscusserDto, TranslateDto } from './dto';
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

  async prosConsDiscusser(prosConsDiscusser: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase(this.openai, {
      prompt: prosConsDiscusser.prompt,
    });
  }

  async translate(translate: TranslateDto) {
    return await translateUseCase(this.openai, {
      prompt: translate.prompt,
      lang: translate.lang,
    });
  }
}
