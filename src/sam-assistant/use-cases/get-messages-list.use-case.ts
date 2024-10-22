import OpenAI from 'openai';

interface Options {
  threadId: string;
}

export const getMessagesList = async (openAi: OpenAI, options: Options) => {
  const { threadId } = options;
  const messages = await openAi.beta.threads.messages.list(threadId);

  return messages.data
    .map((message) => ({
      role: message.role,
      content: message.content.map((content) => (content as any).text.value),
    }))
    .reverse();
};
