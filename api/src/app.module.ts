import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot()], // lists other modules this module depends on
  // tells Nest to use AppController for handling requests directed at the
  // endpoints defined in it.
  controllers: [AppController],
  // providers is where you put the services classes, which contain the business logic
  // that will be injected into controllers.
  providers: [AppService],
})
export class AppModule {}
