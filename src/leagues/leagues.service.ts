import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { League } from './interfaces/league.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/interfaces/user.interface';

@Injectable()
export class LeaguesService {
  constructor(@InjectModel('League')private readonly leagueModel: Model <League>) {}

  async findAllLeagues(): Promise<League[]> {
    return await this.leagueModel.find();
  }
}
