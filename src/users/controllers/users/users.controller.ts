import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // getUsers(@Query('sortDesc', ParseBoolPipe) sortDesc?: boolean) {
  getUsers() {
    return this.usersService.fetchUsers();
  }

  @Get('posts')
  getUsersPosts() {
    return [
      {
        username: 'Mark',
        email: 'mjm@gmail.com',
        posts: [
          {
            id: 1,
            title: 'Post 1',
          },
          {
            id: 2,
            title: 'Post 2',
          },
        ],
      },
    ];
  }

  // Express way
  @Post('create-express')
  _createUser(@Req() request: Request, @Res() response: Response) {
    console.log(request.body);
    response.send('Created');
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: CreateUserDto) {
    console.log(userData);
    this.usersService.createUser(userData);
    return { userData };
  }

  @Get(':id/:postId')
  getUserById(
    @Param('id', ParseIntPipe) id: number,
    @Param('postId') postId: string,
  ) {
    const user = this.usersService.fetchUsersById(id);

    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return user;
    // return { id, postId };
  }
}
