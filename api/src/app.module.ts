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
    ...(process.env.DISABLE_DB === 'true'
      ? []
      : [
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
        ]),
    // AuthModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
