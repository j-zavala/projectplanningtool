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
          console.log('Database is disabled');
          return {} as DataSourceOptions;
        }
        const typeormConfig = configService.get('typeorm');

        // log db config to check if it's correct
        console.log(
          'Database configuration:',
          JSON.stringify(
            {
              ...typeormConfig,
              password: '******', // Mask the password
            },
            null,
            2,
          ),
        );

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
