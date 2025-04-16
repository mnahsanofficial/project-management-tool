import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  async findAll(skip = 0, limit = 10): Promise<Project[]> {
    return this.projectModel.find().skip(skip).limit(limit).exec();
  }

  async findOne(id: string): Promise<Project | null> {
    return this.projectModel.findById(id).exec();
  }
  
  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project | null> {
    return this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .exec();
  }
  
  async remove(id: string): Promise<Project | null> {
    return this.projectModel.findByIdAndDelete(id).exec();
  }
}