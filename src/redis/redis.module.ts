import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      store: 'ioredis', // Use ioredis as the Redis store
      host: 'host.docker.internal', // Redis host (can be the Docker container name if using Docker)
      port: 6379, // Redis port
      ttl: 3600, // Default TTL for cached data (in seconds)
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
