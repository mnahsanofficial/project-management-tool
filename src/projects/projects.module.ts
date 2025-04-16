import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project, ProjectSchema } from './schemas/project.schema';
import { TasksModule } from '../tasks/tasks.module';
import { EventsGateway } from '../events/events.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    TasksModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, EventsGateway],
  exports: [ProjectsService],
})
export class ProjectsModule {}