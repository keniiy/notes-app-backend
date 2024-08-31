import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ example: 'My First Note' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'This is the content of the note.' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
