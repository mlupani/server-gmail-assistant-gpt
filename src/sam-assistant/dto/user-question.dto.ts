import { IsString } from 'class-validator';

export class userQuestionDto {
  @IsString()
  threadId: string;
  @IsString()
  question: string;
}
