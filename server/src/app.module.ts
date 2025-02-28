import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { AgentModule } from './agent/agent.module';

@Module({
  imports: [HttpModule, AgentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
