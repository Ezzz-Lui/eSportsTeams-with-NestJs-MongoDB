import { BadGatewayException, BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { Model } from 'mongoose';
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

  findOne(id: number) {
    return `This action returns a #${id} team`;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
