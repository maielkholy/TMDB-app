import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisService } from '../redis/redis.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([User]),
    CacheModule.register({
      store: 'ioredis', // Use ioredis as the Redis store
      host: 'host.docker.internal', // Redis host (can be the Docker container name if using Docker)
      port: 6379, // Redis port
      ttl: 3600, // Default TTL for cached data (in seconds)
    }),
  ],
  providers: [UsersService, RedisService],
})
export class UsersModule {}
