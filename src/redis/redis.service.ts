import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async setCache(key: string, value: any, ttl: number): Promise<void> {
    try {
      // Ensure the value is serializable before setting it
      await this.cacheManager.set(key, JSON.stringify(value), ttl * 1000);
      console.log(`Cache set for key: ${key}`);
    } catch (err) {
      console.error('Error setting cache:', err);
    }
  }

  async getCache(key: string): Promise<any> {
    try {
      const result = await this.cacheManager.get(key);
      return result ? JSON.parse(<string>result) : null;
    } catch (err) {
      console.error('Error getting cache:', err);
      return null;
    }
  }

  async delCache(key: string): Promise<void> {
    try {
      await this.cacheManager.del(key);
      console.log(`Cache deleted for key: ${key}`);
    } catch (err) {
      console.error('Error deleting cache:', err);
    }
  }
}
