import OpenAI from 'openai';
import { downloadBase64ImageAsPng, downloadImageAsPng } from '../helpers';
import * as fs from 'fs';
import * as path from 'path';

interface Options {
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}

export const imageGenerationUseCase = async (
  openAi: OpenAI,
  options: Options,
) => {
  const { originalImage, prompt, maskImage } = options;

  if (!originalImage || !maskImage) {
    const response = await openAi.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      quality: 'standard',
      response_format: 'url',
      size: '1024x1024',
    });

    const url = await downloadImageAsPng(response.data[0].url);
    const fileName = path.basename(url);

    return {
      localPath: `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`,
      openAiPath: response.data[0].url,
      revised_prompt: response.data[0].revised_prompt,
    };
  }

  const pngImagePath = await downloadImageAsPng(originalImage, true);
  const maskPath = await downloadBase64ImageAsPng(maskImage, true);

  const response = await openAi.images.edit({
    model: 'dall-e-3',
    prompt,
    image: fs.createReadStream(pngImagePath),
    mask: fs.createReadStream(maskPath),
    response_format: 'url',
    size: '1024x1024',
    n: 1,
  });

  const url = await downloadImageAsPng(response.data[0].url);
  const fileName = path.basename(url);

  return {
    localPath: `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`,
    openAiPath: response.data[0].url,
    revised_prompt: response.data[0].revised_prompt,
  };
};
