import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('movie')
export class Movie {
  @Column('simple-array', { default: [] })
  genre_ids: number[];

  @PrimaryColumn('int', { unique: true, nullable: false })
  id: number;

  @Column('varchar', { length: 255, nullable: true })
  original_language: string;

  @Column('varchar', { length: 255, nullable: true })
  original_title: string;

  @Column('text', { nullable: true })
  overview: string;

  @Column('varchar', { length: 255, nullable: true })
  release_date: string;

  @Column('varchar', { nullable: true })
  title: string;

  @Column('float', { default: 0.0 })
  vote_average: number;

  @Column('int', { default: 0 })
  vote_count: number;
}
