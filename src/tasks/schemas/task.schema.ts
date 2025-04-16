import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true, ref: 'Project' })
  project: string;

  @Prop({ default: 'pending' })
  status: string;

  @Prop()
  dueDate: Date;

  @Prop({ default: false })
  completed: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);