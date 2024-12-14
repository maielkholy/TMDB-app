import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { DataMigrationService } from '../migration.service';

@Module({
  controllers: [MoviesController],
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MoviesService, DataMigrationService],
})
export class MoviesModule {}
