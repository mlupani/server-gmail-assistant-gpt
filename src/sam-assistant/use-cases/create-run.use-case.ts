import OpenAI from 'openai';

interface Options {
  threadId: string;
  assistantId?: string;
}

export const createRunUseCase = async (openAi: OpenAI, options: Options) => {
  const { threadId, assistantId = 'asst_QtUViXhUKVY1IUR67lpwYfAG' } = options;
  const run = await openAi.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
    //instructions Sobreescribe la config en openAi
  });
  return run;
};
