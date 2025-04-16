import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Param, 
    UseGuards, 
    Query,
    Patch,
    Delete
  } from '@nestjs/common';
  import { ProjectsService } from './projects.service';
  import { CreateProjectDto } from './dto/create-project.dto';
  import { UpdateProjectDto } from './dto/update-project.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  import { PaginationParams } from '../utils/pagination.params';
  
  @ApiTags('projects')
  @ApiBearerAuth()
  @Controller('projects')
  @UseGuards(JwtAuthGuard)
  export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new project' })
    @ApiResponse({ status: 201, description: 'Project created successfully' })
    create(@Body() createProjectDto: CreateProjectDto) {
      return this.projectsService.create(createProjectDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get all projects with pagination' })
    findAll(@Query() { skip, limit }: PaginationParams) {
      return this.projectsService.findAll(skip, limit);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a project by ID' })
    findOne(@Param('id') id: string) {
      return this.projectsService.findOne(id);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Update a project' })
    update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
      return this.projectsService.update(id, updateProjectDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a project' })
    remove(@Param('id') id: string) {
      return this.projectsService.remove(id);
    }
  }