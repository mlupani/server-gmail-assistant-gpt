import OpenAI from 'openai';

interface Options {
  threadId: string;
  runId: string;
}

export const checkStatusRunUseCase = async (
  openAi: OpenAI,
  options: Options,
) => {
  const { threadId, runId } = options;
  const runStatus = await openAi.beta.threads.runs.retrieve(threadId, runId);

  console.log({ status: runStatus.status });
  if (runStatus.status === 'completed') {
    return runStatus;
  }

  if (runStatus.status === 'failed') {
    throw new Error(runStatus.last_error.message);
  }

  //espero un segundo
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return await checkStatusRunUseCase(openAi, options);
};
