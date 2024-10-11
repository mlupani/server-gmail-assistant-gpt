import OpenAI from 'openai';
import * as fs from 'fs';

interface Options {
  prompt: string;
  audioFile: Express.Multer.File;
}

export const audioToTextUseCase = async (openAi: OpenAI, options: Options) => {
  const { audioFile, prompt } = options;

  const response = await openAi.audio.transcriptions.create({
    model: 'whisper-1',
    file: fs.createReadStream(audioFile.path),
    prompt: prompt, //mismo idioma del audio
    language: 'es',
    response_format: 'verbose_json', // text, vtt, srt, verbose_json
  });

  return response;
};
