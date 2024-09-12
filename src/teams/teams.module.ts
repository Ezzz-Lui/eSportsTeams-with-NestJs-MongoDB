import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Team, TeamsSchema } from './entities/team.entity';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Team.name,
        schema: TeamsSchema,
      }
    ]
    )
  ]
})
export class TeamsModule {}
