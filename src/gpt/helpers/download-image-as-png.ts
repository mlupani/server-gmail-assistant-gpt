import * as path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';

export const downloadImageAsPng = async (
  url: string,
  returnPath: boolean = false,
) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download image from ${url}`);
  }

  const folderPath = path.resolve('./', './generated/images/');
  const fileName = new Date().getTime() + '.png';
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.mkdirSync(folderPath, { recursive: true });
  const fullPath = `${folderPath}/${fileName}`;
  //fs.writeFileSync(`${folderPath}/${fileName}`, buffer);

  await sharp(buffer).png().ensureAlpha().toFile(fullPath);
  return returnPath ? fullPath : fileName;
};

export const downloadBase64ImageAsPng = async (
  base64Image: string,
  returnPath: boolean = false,
) => {
  // Remover encabezado
  base64Image = base64Image.split(';base64,').pop();
  const imageBuffer = Buffer.from(base64Image, 'base64');

  const folderPath = path.resolve('./', './generated/images/');
  fs.mkdirSync(folderPath, { recursive: true });

  const imageNamePng = `${new Date().getTime()}-64.png`;

  const fullPath = `${folderPath}/${imageNamePng}`;

  // Transformar a RGBA, png // Así lo espera OpenAI
  await sharp(imageBuffer).png().ensureAlpha().toFile(fullPath);

  return returnPath ? fullPath : imageNamePng;
};
