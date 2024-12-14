import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('movie')
export class Movie {
  @Column('boolean', { default: false })
  /** Indicates if the content is for adults */
  adult: boolean;

  @Column('simple-array', { default: [] })
  /** Array of genre IDs associated with the movie */
  genre_ids: number[];

  @PrimaryColumn('int', { unique: true, nullable: false })
  /** Unique identifier for the movie */
  id: number;

  @Column('varchar', { length: 255 })
  /** Original language of the movie */
  original_language: string;

  @Column('varchar', { length: 255 })
  /** Original title of the movie */
  original_title: string;

  @Column('text')
  /** Short description of the movie */
  overview: string;

  @Column('varchar', { length: 255 })
  /** Release date of the movie */
  release_date: string;

  @Column('varchar')
  /** Title of the movie */
  title: string;

  @Column('float')
  /** Average vote score */
  vote_average: number;

  @Column('int')
  /** Total number of votes */
  vote_count: number;
}
