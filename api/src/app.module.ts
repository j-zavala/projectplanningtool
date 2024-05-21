import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Name } from './name.entity';
import typeorm from './config/typeorm';
// import { Logger } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        // configService.get('typeorm'),
        {
          const host = configService.get<string>('DATABASE_HOST');
          const port = configService.get<number>('DATABASE_PORT');
          const username = configService.get<string>('DATABASE_USERNAME');
          const password = configService.get<string>('DATABASE_PASSWORD');
          const database = configService.get<string>('DATABASE_NAME');

          console.log('app.module.ts : useFactory() ========================');
          console.log('ConfigService DATABASE_HOST:', host);
          console.log('ConfigService DATABASE_PORT:', port);
          console.log('ConfigService DATABASE_USERNAME:', username);
          console.log('ConfigService DATABASE_PASSWORD:', password);
          console.log('ConfigService DATABASE_NAME:', database);
          console.log('app.module.ts : useFactory() ========================');

          const typeormConfig = configService.get('typeorm');
          console.log('TypeORM Configuration:', typeormConfig); // logs the configuration
          return {
            ...typeormConfig,
            autoLoadEntities: true,
          };
        },
    }),
    TypeOrmModule.forFeature([Name]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const typeormConfig = this.configService.get('typeorm');
    console.log('TypeORM Configuration on Module Init:', typeormConfig);
    // Logger.log('envssss:', typeormConfig);
  }
}
