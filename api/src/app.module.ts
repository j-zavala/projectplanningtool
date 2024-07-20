import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Name } from './name.entity';
import typeorm from './config/typeorm';
import { DataSourceOptions } from 'typeorm';
// import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';

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
        // to disable db, set DISABLE_DB=true
        const isDbDisabled = configService.get('DISABLE_DB') === 'true';
        if (isDbDisabled) {
          return {} as DataSourceOptions;
        }
        // log db config to check if it's correct
        const dbConfig = {
          type: 'postgres' as const,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
        };
        console.log(
          'Database configuration:',
          JSON.stringify(dbConfig, null, 2),
        );
        const typeormConfig = configService.get('typeorm');
        return {
          ...typeormConfig,
          autoLoadEntities: true,
        };
      },
    }),
    TypeOrmModule.forFeature([Name]),
    // AuthModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
