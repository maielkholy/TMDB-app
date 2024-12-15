import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CacheModule } from '@nestjs/cache-manager';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    CacheModule.register({
      store: 'ioredis', // Use ioredis as the Redis store
      host: process.env.REDIS_HOST, // Redis host (can be the Docker container name if using Docker)
      port: process.env.REDIS_PORT, // Redis port
      ttl: 3600, // Default TTL for cached data (in seconds)
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
