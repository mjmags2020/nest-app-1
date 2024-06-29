import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserType } from 'src/users/utils/type';

@Injectable()
export class UsersService {
  private fakeUsers = [
    { id: 1, username: 'Mark', email: 'mark@gmail.com' },
    { id: 2, username: 'MJ', email: 'mjm@gmail.com' },
  ];
  fetchUsers() {
    return this.fakeUsers;
  }
  createUser(user: CreateUserType) {
    this.fakeUsers.push(user);
    return user;
  }

  fetchUsersById(id: number) {
    const user = this.fakeUsers.find((user) => user.id === id);
    return user;
  }
}
