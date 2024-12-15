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
    let data = [];
    const pages = 5;
    for (let i = 1; i <= pages; i++) {
      data = data.concat(await this.fetchData(i));
    }
    await this.saveData(data);
  }
  async saveData(data: any[]): Promise<void> {
    const resources = data as Movie[];
    const movies = Array.from(
      new Map(resources.map((movie) => [movie.id, movie])).values(),
    );
    await this.resourceRepository.upsert(movies, ['id']);
  }
  async fetchData(page: number): Promise<any[]> {
    const url = `${process.env.TMDB_URL}&page=${page}`;
    const options = {
      method: 'GET',
      url: url,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_AUTH_TOKEN}`,
      },
    };
    return new Promise((resolve, reject) => {
      axios
        .request(options)
        .then((res) => {
          resolve(res.data.results); // resolve the promise with the response data
        })
        .catch((err) => {
          console.error(err);
          reject(err); // reject the promise if there’s an error
        });
    });
  }
}
