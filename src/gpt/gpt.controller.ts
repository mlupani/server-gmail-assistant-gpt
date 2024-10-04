import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyCheckDto } from './dto';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(@Body() orthographyCheckDto: OrthographyCheckDto) {
    return this.gptService.orthographyCheck(orthographyCheckDto);
  }
}
