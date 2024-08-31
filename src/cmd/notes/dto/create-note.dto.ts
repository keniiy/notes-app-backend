import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ example: 'My First Note' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'This is the content of the note.' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  @IsNotEmpty()
  @IsDate()
  timestamp: Date;
}
