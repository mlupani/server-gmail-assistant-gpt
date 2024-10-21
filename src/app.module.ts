import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';
import { GptController } from './gpt/gpt.controller';
import { GptService } from './gpt/gpt.service';
import { ConfigModule } from '@nestjs/config';
import { SamAssistantModule } from './sam-assistant/sam-assistant.module';

@Module({
  imports: [GptModule, ConfigModule.forRoot(), SamAssistantModule],
  controllers: [GptController],
  providers: [GptService],
})
export class AppModule {}
