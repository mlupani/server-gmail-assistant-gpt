import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';
import { GptController } from './gpt/gpt.controller';
import { GptService } from './gpt/gpt.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [GptModule, ConfigModule.forRoot()],
  controllers: [GptController],
  providers: [GptService],
})
export class AppModule {}
