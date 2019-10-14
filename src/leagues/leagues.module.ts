import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaguesController } from './leagues.controller';
import { LeaguesService } from './leagues.service';
import { LeagueSchema } from './schemas/league.schema';
import { UserSchema } from '../users/schemas/user.schema';
import { StageSchema } from '../stages/schemas/stage.schema';
import { RaceSchema } from '../races/schemas/races.schema';

@Module({
  imports: [MongooseModule.forFeature(
    [
      {name: 'League', schema: LeagueSchema},
      {name: 'User', schema: UserSchema},
      {name: 'Stage', schema: StageSchema},
      {name: 'Race', schema: RaceSchema},
      ])],
  controllers: [LeaguesController],
  providers: [LeaguesService],
})
export class LeaguesModule {}
