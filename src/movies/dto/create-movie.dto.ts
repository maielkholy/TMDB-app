import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Array of genre IDs associated with the movie',
    type: [Number],
    example: [28, 80, 18],
  })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  genre_ids?: number[];

  @ApiProperty({
    description: 'Unique identifier for the movie',
    type: Number,
    example: 1171640,
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'Original language of the movie',
    type: String,
    example: 'fr',
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  original_language: string;

  @ApiProperty({
    description: 'Original title of the movie',
    type: String,
    example: 'GTMAX',
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  original_title: string;

  @ApiProperty({
    description: 'Short description of the movie',
    type: String,
    example:
      'When a notorious gang of bikers recruits her brother for a heist, a former motocross champion must face her deepest fears to keep her family safe.',
  })
  @IsString()
  @IsNotEmpty()
  overview: string;

  @ApiProperty({
    description: 'Release date of the movie',
    type: String,
    example: '2024-11-19',
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  release_date: string;

  @ApiProperty({
    description: 'Title of the movie',
    type: String,
    example: 'GTMAX',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Average vote score',
    type: Number,
    example: 6.1,
  })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  vote_average: number;

  @ApiProperty({
    description: 'Total number of votes',
    type: Number,
    example: 73,
  })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  vote_count: number;
}
