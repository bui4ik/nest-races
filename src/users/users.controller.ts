import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { UsersWithRaces } from './interfaces/usersWithRaces.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/byRaces')
  getAllUsersWithRaces(): Promise<UsersWithRaces> {
    return this.usersService.getAllUsersWithRaces();
  }

  @Get('/byLeagues')
  getAllUsersWithLeagues(): Promise<any> {
    return this.usersService.getAllUsersWithLeagues();
}

  @Get()
  findAllUsers(): Promise<User[]> {
     return this.usersService.findAllUsers();
  }

  @Get(':id')
  findUserById(@Param('id') id): Promise<User> {
    return this.usersService.findUserById(id);
  }

  @Post()
  createNewUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createNewUser(createUserDto);
  }

  @Put(':id')
  updateUser(@Param('id') id, @Body() updateUserDto: CreateUserDto): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}
