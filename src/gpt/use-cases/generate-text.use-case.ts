import OpenAI from 'openai';

interface Options {
  prompt: string;
  systemPrompt?: string;
}

export const generateTextUseCase = async (
  openai: OpenAI,
  {
    prompt,
    systemPrompt = 'You are a helpful assistant that generates text content.',
  }: Options,
) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo',
    max_tokens: 1000,
    temperature: 0.7,
  });

  return {
    content: completion.choices[0].message.content,
  };
};
