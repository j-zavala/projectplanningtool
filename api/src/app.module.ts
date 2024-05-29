import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Name } from './name.entity';
import typeorm from './config/typeorm';
import { DataSourceOptions } from 'typeorm';
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
      useFactory: async (
        configService: ConfigService,
      ): Promise<DataSourceOptions> => {
        const typeormConfig = configService.get('typeorm');
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
export class AppModule {
  // constructor(private configService: ConfigService) {}
}
