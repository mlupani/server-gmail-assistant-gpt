import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthrographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: {
      type: 'json_object',
    },
    messages: [
      {
        role: 'system',
        content: `
        Te seràn proveidos textos en español con posibles errores ortograficos y gramaticales.
        Las palabras usadas deben existir en el diccionario de la Real Academia Española.
        Debes responder en formato JSON.
        tu tarea es corregir los errores y responder con el texto corregido.
        tambien debes dar un porcentaje de acierto por el usuario.

        Si no hay errores en el texto, responde con un mensaje de felicitaciones.

        Ejemplo de respuesta:
        {
          userScore: number,
          errors: string[], // [error -> solucion]
          message: string, //Usa emojis y texto para felicitar.
        }
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const json_res = JSON.parse(completion.choices[0].message.content);
  return json_res;

  return {
    prompt: prompt,
    api_key: process.env.OPENAI_API_KEY,
  };
};
