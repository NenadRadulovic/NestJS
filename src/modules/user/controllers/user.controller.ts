import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../model/user.entity';
import { CreateUserDTO } from '../dtos/create-user.request';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async index(): Promise<User[]> {
    const users = await this.userService.getUsers();
    return users;
  }

  @Post('/')
  async store(@Body() userDTO: CreateUserDTO): Promise<User> {
    const user = await this.userService.createUser(userDTO);
    return user;
  }
  @Get('/:id')
  async view(@Param('id') id: number) {
    const user = await this.userService.getUserByID(id);
    return user;
  }
}
