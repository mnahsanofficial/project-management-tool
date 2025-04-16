import { 
    WebSocketGateway, 
    SubscribeMessage, 
    MessageBody,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { ProjectsService } from '../projects/projects.service';
  import { Logger } from '@nestjs/common';
  
  @WebSocketGateway({ cors: true })
  export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    
    private logger = new Logger('EventsGateway');
    
    constructor(private readonly projectsService: ProjectsService) {}
    
    handleConnection(client: Socket) {
      this.logger.log(`Client connected: ${client.id}`);
    }
    
    handleDisconnect(client: Socket) {
      this.logger.log(`Client disconnected: ${client.id}`);
    }
    
    @SubscribeMessage('joinProjectRoom')
    handleJoinProjectRoom(client: Socket, projectId: string) {
      client.join(`project_${projectId}`);
      this.logger.log(`Client ${client.id} joined project room ${projectId}`);
    }
    
    @SubscribeMessage('leaveProjectRoom')
    handleLeaveProjectRoom(client: Socket, projectId: string) {
      client.leave(`project_${projectId}`);
      this.logger.log(`Client ${client.id} left project room ${projectId}`);
    }
    
    emitProjectUpdate(project: any) {
      this.server.to(`project_${project._id}`).emit('projectUpdate', project);
      this.logger.log(`Emitted project update for project ${project._id}`);
    }
    
    emitTaskUpdate(task: any) {
      this.server.to(`project_${task.project}`).emit('taskUpdate', task);
      this.logger.log(`Emitted task update for project ${task.project}`);
    }
  }