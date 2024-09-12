import { join } from 'path'; //Native from node js
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public')
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
