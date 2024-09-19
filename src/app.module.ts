import { join } from 'path'; //Native from node js
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TeamsModule } from './teams/teams.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      
    }),

    MongooseModule.forRoot('mongodb://localhost:27017/esports-db'),


    TeamsModule,


    CommonModule,


    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
