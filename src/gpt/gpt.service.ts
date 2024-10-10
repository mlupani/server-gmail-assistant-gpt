import { Injectable, NotFoundException } from '@nestjs/common';
import {
  audioToTextUseCase,
  orthrographyCheckUseCase,
  prosConsDiscusserUseCase,
  textToAudioUseCase,
  translateUseCase,
} from './use-cases';
import {
  AudioToTextDto,
  OrthographyCheckDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
} from './dto';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

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

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, { prompt, voice });
  }

  async textToAudioGetter(fileId: string) {
    const filePath = path.resolve(
      __dirname,
      '../../generated/audios/',
      `${fileId}.mp3`,
    );

    const wasFound = fs.existsSync(filePath);

    if (!wasFound) throw new NotFoundException(`File ${fileId} not found`);

    return filePath;
  }

  async audioToText(
    audioFile: Express.Multer.File,
    audioToTextDto: AudioToTextDto,
  ) {
    const { prompt } = audioToTextDto;
    return await audioToTextUseCase(this.openai, { audioFile, prompt });
  }
}
