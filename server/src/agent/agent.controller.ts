import { Body, Controller, Post } from '@nestjs/common';
import { AgentService } from './agent.service';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post('generate')
  async generateWorkflow(@Body() body: { request: string }) {
    console.log('generateWorkflow', body.request);
    return this.agentService.generateWorkflow(body.request);
  }
}