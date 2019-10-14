import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { LeaguesService} from './leagues.service';
import { League } from './interfaces/league.interface';
import { CreateLeagueDto } from './dto/create-league.dto';
import { AddUserToLeagueDto } from './dto/add-user-to-league.dto';

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leagueService: LeaguesService) {}

  @Post(':id/users')
  addUserToLeague(@Param('id') id,  @Body() addUserToLeagueDto: AddUserToLeagueDto) {
    return this.leagueService.addUserToLeague(id, addUserToLeagueDto.id);
  }

  @Get()
  getAllLeagues(): Promise<League[]> {
    return this.leagueService.findAllLeagues();
  }

  @Get(':id')
  findLeagueById(@Param('id') id): Promise<League> {
    return this.leagueService.findLeagueById(id);
  }

  @Post()
  createNewLeague(@Body() createLeagueDto: CreateLeagueDto): Promise<League> {
    return this.leagueService.createNewLeague(createLeagueDto);
  }

  @Put(':id')
  updateLeague(@Param('id') id, @Body() updateLeagueDtO: CreateLeagueDto): Promise<League> {
    return this.leagueService.updateLeague(id, updateLeagueDtO);
  }

  @Delete(':id')
  deleteLeague(@Param('id') id): Promise<League> {
    return this.leagueService.deleteLeague(id);
  }
}
