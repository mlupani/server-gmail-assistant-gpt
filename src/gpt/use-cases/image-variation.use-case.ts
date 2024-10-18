import OpenAI from 'openai';
import { downloadImageAsPng } from '../helpers';
import * as fs from 'fs';

interface Options {
  baseImage: string;
}

export const imageVariationUseCase = async (
  openAi: OpenAI,
  options: Options,
) => {
  const { baseImage } = options;

  const imageFullPath = await downloadImageAsPng(baseImage, true);

  const response = await openAi.images.createVariation({
    model: 'dall-e-2',
    image: fs.createReadStream(imageFullPath),
    response_format: 'url',
    n: 1,
    size: '1024x1024',
  });

  const image = await downloadImageAsPng(response.data[0].url);
  const localPath = `${process.env.SERVER_URL}/gpt/image-generation/${image}`;

  return {
    url: localPath,
    openAiPath: response.data[0].url,
    revised_prompt: response.data[0].revised_prompt,
  };
};
