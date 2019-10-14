import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { LeaguesService} from './leagues.service';
import { League } from './interfaces/league.interface';

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leagueService: LeaguesService) {}

  @Get()
  getAllLeagues(): Promise<League[]> {
    return this.leagueService.findAllLeagues();
  }
}
