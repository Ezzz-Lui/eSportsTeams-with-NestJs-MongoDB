import { BadGatewayException, BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TeamsService {

  constructor(
    @InjectModel( Team.name )
    readonly teamModel: Model<Team>
  ){

  }

  async create(createTeamDto: CreateTeamDto) {
    createTeamDto.name = createTeamDto.name.toLowerCase();

    try{
      const team = await this.teamModel.create( createTeamDto );
      return team;
    }
    catch(error){
      if( error.code === 11000) {
        throw new BadRequestException(`This team exist in db => ${ JSON.stringify( error.keyValue )}`);
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create team. Please check database logs!!!`)
    }
  }

  findAll() {
    return `This action returns all teams`;
  }

  async findOne(termSearch: string) {
    let team: Team;

    if( !isNaN(+termSearch) ) {
      team = await this.teamModel.findOne({ idTeam: termSearch});
    }

    //mongoID
    if( !team && isValidObjectId( termSearch ) ){
      team = await this.teamModel.findById( termSearch )
    }

    //team
    if( !team ) {
      team = await this.teamModel.findOne( {name: termSearch.toLowerCase().trim()})
    }

    //no existe ningun team
    if( !team )
      throw new NotFoundException(`Team with id or name: "${termSearch}" not found`);
    

    return team;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
