import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { IS_MONGO_ID } from 'class-validator';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @HttpCode( HttpStatus.CREATED )
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':termSearch')
  findOne(@Param('termSearch') termSearch: string) {
    return this.teamsService.findOne(termSearch);
  }

  @HttpCode( HttpStatus.ACCEPTED )
  @Patch(':termSearch')
  update(@Param('termSearch') termSearch: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(termSearch, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe ) id: string) {
    return this.teamsService.remove(id);
  }
}
