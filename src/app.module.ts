import { join } from 'path'; //Native from node js
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TeamsModule } from './teams/teams.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      exclude: ['/(.*)'],
    }),

    MongooseModule.forRoot('mongodb://localhost:27017/esports-db'),


    TeamsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
