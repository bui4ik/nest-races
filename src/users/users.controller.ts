import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { UsersWithRaces } from './interfaces/usersWithRaces.interface';
import { ApiOperation, ApiUseTags, ApiImplicitParam, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';

@ApiUseTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/byRaces')
  @ApiOperation({title: 'Get users with race'})
  getAllUsersWithRaces(): Promise<UsersWithRaces> {
    return this.usersService.getAllUsersWithRaces();
  }

  @Get('/byLeagues')
  @ApiOperation({title: 'Get users with leagues'})
  getAllUsersWithLeagues(): Promise<any> {
    return this.usersService.getAllUsersWithLeagues();
}

  @Get()
  @ApiOperation({title: 'Get all users'})
  @ApiCreatedResponse({ description: 'All users array', type: [CreateUserDto] })
  @ApiResponse({ status: 404, description: 'Something goes wrong'})
  findAllUsers(): Promise<User[]> {
     return this.usersService.findAllUsers();
  }

  @Get(':id')
  @ApiImplicitParam({ name: 'user id'})
  @ApiOperation({title: 'Get user by id'})
  findUserById(@Param('id') id): Promise<User> {
    return this.usersService.findUserById(id);
  }

  @Post()
  @ApiOperation({title: 'Create new user'})
  createNewUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createNewUser(createUserDto);
  }

  @Put(':id')
  @ApiOperation({title: 'Update user'})
  updateUser(@Param('id') id, @Body() updateUserDto: CreateUserDto): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({title: 'Delete user'})
  deleteUser(@Param('id') id): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}
