import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [ProjectsModule],
  providers: [EventsGateway],
})
export class EventsModule {}