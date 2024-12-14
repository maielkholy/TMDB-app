import { Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
import * as process from 'node:process';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movies/entities/movie.entity';
import { Repository } from 'typeorm';

dotenv.config();
@Injectable()
export class DataMigrationService implements OnModuleInit {
  constructor(
    @InjectRepository(Movie)
    private resourceRepository: Repository<Movie>,
  ) {}

  async onModuleInit() {
    const data = await this.fetchData();
    await this.saveData(data);
  }
  async saveData(data: any[]): Promise<void> {
    const resources = data['results'] as Movie[];
    await this.resourceRepository.save(resources);
  }
  async fetchData(): Promise<any[]> {
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_AUTH_TOKEN}`,
      },
    };

    return new Promise((resolve, reject) => {
      axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          resolve(res.data); // resolve the promise with the response data
        })
        .catch((err) => {
          console.error(err);
          reject(err); // reject the promise if there’s an error
        });
    });
  }
}
