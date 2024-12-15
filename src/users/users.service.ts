import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: password,
      });
      await this.userRepository.save(user);
      return {
        ...userData,
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`Invalid User`);
    return user;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

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
