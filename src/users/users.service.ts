import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UsersWithRaces } from './interfaces/usersWithRaces.interface';
import { Model } from 'mongoose';
import { InjectModel} from '@nestjs/mongoose';
import { Race } from '../races/interfaces/race.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private saltRounds = 10;

  constructor(@InjectModel('User')private readonly userModel: Model <User>,
              @InjectModel('Race')private readonly raceModel: Model <Race>) {}

  async findAllUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findUserById(id: string): Promise<User> {
    return await this.userModel.findOne({_id: id});
  }

  async createNewUser(user: User): Promise<User> {
    user.password = await this.getHash(user.password);
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async updateUser(id: string, user: User): Promise<User> {
    return await this.userModel.findOneAndUpdate(id, user, {new: true});
  }

  async deleteUser(id: string): Promise<User> {
    const races = await this.raceModel.find({});
    if (!races) {
      return await this.userModel.findByIdAndRemove(id);
    } else {
      await this.raceModel.deleteMany({ userId: id });
      return  await this.userModel.findByIdAndRemove(id);
    }
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

  async getAllUsersWithLeagues(): Promise<any> {
    return await this.userModel.aggregate([
      {
        $lookup: {
          from: 'leagues',
          localField: '_id',
          foreignField: 'users',
          as: 'leagues',
        },
      },
    ]);
  }

  async findOneUser(username: string): Promise<User> {
    return await this.userModel.findOne({username});
  }

  async getHash(password: string|undefined): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compareHash(password: string|undefined, hash: string|undefined): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
