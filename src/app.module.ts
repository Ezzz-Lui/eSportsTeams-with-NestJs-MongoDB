import { join } from 'path'; //Native from node js
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TeamsModule } from './teams/teams.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public')
    }),
    TeamsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
