import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { GenerateTextDto } from './dto';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('generate-text')
  generateText(@Body() generateTextDto: GenerateTextDto) {
    return this.gptService.generateText(generateTextDto);
  }
}
