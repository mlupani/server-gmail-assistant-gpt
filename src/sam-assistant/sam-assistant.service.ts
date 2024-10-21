import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  checkStatusRunUseCase,
  createRunUseCase,
  createThreadUseCase,
  getMessagesList,
  userQuestionUseCase,
} from './use-cases';
import { userQuestionDto } from './dto/user-question.dto';

@Injectable()
export class SamAssistantService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async createThread() {
    return await createThreadUseCase(this.openai);
  }

  async userQuestion(userQuestionDto: userQuestionDto) {
    await userQuestionUseCase(this.openai, userQuestionDto);
    const run = await createRunUseCase(this.openai, {
      threadId: userQuestionDto.threadId,
    });

    await checkStatusRunUseCase(this.openai, {
      runId: run.id,
      threadId: userQuestionDto.threadId,
    });

    const messages = await getMessagesList(this.openai, {
      threadId: userQuestionDto.threadId,
    });

    return messages;
  }
}
