import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Collections } from '@common/@types';
import { NoteSchema, NotesRepository } from '@common/DAL';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Collections.NOTES, schema: NoteSchema },
    ]),
  ],
  controllers: [NotesController],
  providers: [NotesService, NotesRepository],
})
export class NotesModule {}
