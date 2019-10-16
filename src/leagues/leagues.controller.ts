import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { LeaguesService} from './leagues.service';
import { League } from './interfaces/league.interface';
import { CreateLeagueDto } from './dto/create-league.dto';
import { AddUserToLeagueDto } from './dto/add-user-to-league.dto';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

@ApiUseTags('Leagues')
@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leagueService: LeaguesService) {}

  @Post(':id/users')
  @ApiOperation({title: 'Add user to league'})
  addUserToLeague(@Param('id') id,  @Body() addUserToLeagueDto: AddUserToLeagueDto) {
    return this.leagueService.addUserToLeague(id, addUserToLeagueDto.id);
  }

  @Get()
  @ApiOperation({title: 'Get all leagues'})
  getAllLeagues(): Promise<League[]> {
    return this.leagueService.findAllLeagues();
  }

  @Get(':id')
  @ApiOperation({title: 'Find league by id'})
  findLeagueById(@Param('id') id): Promise<League> {
    return this.leagueService.findLeagueById(id);
  }

  @Post()
  @ApiOperation({title: 'Create new league'})
  createNewLeague(@Body() createLeagueDto: CreateLeagueDto): Promise<League> {
    return this.leagueService.createNewLeague(createLeagueDto);
  }

  @Put(':id')
  @ApiOperation({title: 'Update league'})
  updateLeague(@Param('id') id, @Body() updateLeagueDtO: CreateLeagueDto): Promise<League> {
    return this.leagueService.updateLeague(id, updateLeagueDtO);
  }

  @Delete(':id')
  @ApiOperation({title: 'Delete league'})
  deleteLeague(@Param('id') id): Promise<League> {
    return this.leagueService.deleteLeague(id);
  }
}
