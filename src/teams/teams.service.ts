import { BadGatewayException, BadRequestException, HttpCode, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  async update(termSearch: string, updateTeamDto: UpdateTeamDto) {
    const team = await this.findOne(termSearch);
    try{
      await team.updateOne( updateTeamDto, { new: true } )
      return { ...team.toJSON(), ...updateTeamDto};
    }
    catch(error){
      if(error.code === 11000){
        throw new BadRequestException(`You cannot add id: "${updateTeamDto.idTeam}" to this team because it already exists.`)
      }
      console.log(error)
      throw new BadGatewayException(`Cant update this team, please check dataabse logs!!!`)
    }
  }

  async remove(id: string) {
    // const team = await this.findOne( id );
    // await team.deleteOne();
    // const result = await this.teamModel.findByIdAndDelete( id )
    const { deletedCount } = await this.teamModel.deleteOne({ _id: id})
    if ( deletedCount === 0 )
      throw new BadRequestException(`MongoID: ${id} not found. Check the id is correct and try again!`)
    
    return `Team with id: ${id} was removed`;
  }
}
