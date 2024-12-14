import { Column, Entity } from 'typeorm';

@Entity('movie')
export class Movie {
  @Column('boolean', { default: false })
  /** Indicates if the content is for adults */
  adult: boolean;

  @Column('string')
  /** Path to the backdrop image */
  backdrop_path: string;

  @Column('array', { default: [] })
  /** Array of genre IDs associated with the movie */
  genre_ids: number[];

  @Column('number', { unique: true, nullable: false })
  /** Unique identifier for the movie */
  id: number;

  @Column('string')
  /** Original language of the movie */
  original_language: string;

  @Column('string')
  /** Original title of the movie */
  original_title: string;

  @Column('string')
  /** Short description of the movie */
  overview: string;

  @Column('int')
  /** Popularity score of the movie */
  popularity: number;

  @Column('string')
  /** Path to the poster image */
  poster_path: string;

  @Column('string')
  /** Release date of the movie */
  release_date: string;

  @Column('string')
  /** Title of the movie */
  title: string;

  @Column('boolean')
  /** Indicates if the movie has a video */
  video: boolean;

  @Column('int')
  /** Average vote score */
  vote_average: number;

  @Column('int')
  /** Total number of votes */
  vote_count: number;
}
