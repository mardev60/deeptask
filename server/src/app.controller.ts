import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('execute-tasks')
  async executeTasks(@Body() tasks: any) {
    console.log('executeTasks', tasks);
    return await this.appService.executeTasks(tasks);
  }
}
