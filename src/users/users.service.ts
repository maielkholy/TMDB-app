import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RedisService } from '../redis/redis.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly redisService: RedisService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: await bcrypt.hash(password, 10),
      });
      await this.userRepository.save(user);
      return {
        ...userData,
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    const cacheKey = 'all_users';
    const cachedUsers = await this.redisService.getCache(cacheKey);
    if (cachedUsers != null) {
      console.log('Returning cached data');
      return JSON.parse(cachedUsers); // Cache is stored as a string
    }
    console.log('Fetching from database');
    const users = await this.userRepository.find();
    await this.redisService.setCache(cacheKey, JSON.stringify(users), 3600); // Cache for 1 hour
    return users;
  }

  async findOne(id: string) {
    const cacheKey = `user_${id}`;
    const cachedUser = await this.redisService.getCache(cacheKey);
    if (cachedUser != null) {
      console.log('Returning cached data');
      return JSON.parse(cachedUser); // Cache is stored as a string
    }

    console.log('Fetching from database');
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`Invalid User`);
    await this.redisService.setCache(cacheKey, JSON.stringify(user), 3600); // Cache for 1 hour
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const { password, ...userData } = updateUserDto;
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(password, 10);
      }
      await this.userRepository.update(id, updateUserDto);
      return {
        ...userData,
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new BadRequestException(`User with id ${id} does not exist.`);
    await this.userRepository.delete({ id });
    return true;
  }

  handleExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(`${error.detail}`);
    console.log(error);

    throw new InternalServerErrorException(
      `Oops, something went wrong. Check server logs`,
    );
  }
}
