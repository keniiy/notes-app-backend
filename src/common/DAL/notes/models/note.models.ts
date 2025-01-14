import { Collections, INote } from '@common/@types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({ collection: Collections.NOTES, timestamps: true })
export class NoteModel implements INote {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  timestamp: Date;
}

export type NoteDocument = NoteModel &
  Document & {
    createdAt: Date;
    updatedAt: Date;
  };

export const NoteSchema = SchemaFactory.createForClass(NoteModel);
NoteSchema.plugin(mongoosePaginate);
