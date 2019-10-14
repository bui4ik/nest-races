import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UsersWithRaces } from './interfaces/usersWithRaces.interface';
import { Model } from 'mongoose';
import { InjectModel} from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User')private readonly userModel: Model <User>) {}

  async findAllUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findUserById(id: string): Promise<User> {
    return await this.userModel.findOne({_id: id});
  }

  async createNewUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async updateUser(id: string, user: User): Promise<User> {
    return await this.userModel.findOneAndUpdate(id, user, {new: true});
  }

  async deleteUser(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }

  async getAllUsersWithRaces(): Promise<UsersWithRaces> {
    return await this.userModel.aggregate([
      {
        $lookup: {
          from: 'races',
          localField: '_id',
          foreignField: 'userId',
          as: 'races',
        },
      },
    ]);
  }

}
