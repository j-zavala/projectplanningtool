import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  // TEMPORARY: just check if .env is being read correctly - success
  onModuleInit() {
    const username = this.configService.get<string>('DATABASE_USERNAME');
    console.log('database user env variable:', username);
  }

  async getNames() {
    return {};
  }

  // async because we are going to use database.
  async addName(name: object) {
    console.log('--->', name);
    return name;
  }
}
