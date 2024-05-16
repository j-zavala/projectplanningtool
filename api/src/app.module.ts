import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { Name } from './name.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Name],
      synchronize: true,
      logging: 'all',
    }),
    TypeOrmModule.forFeature([Name]),
  ], // lists other modules this module depends on
  // tells Nest to use AppController for handling requests directed at the
  // endpoints defined in it.
  controllers: [AppController],
  // providers is where you put the services classes, which contain the business logic
  // that will be injected into controllers.
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {}
  async onModuleInit() {
    console.log('Database connected:', await this.dataSource.isInitialized);

    console.log({
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });
  }
}
