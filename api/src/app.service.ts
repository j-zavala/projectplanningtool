// import { Injectable, OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Name } from './name.entity';
import { Repository } from 'typeorm';

@Injectable()
// export class AppService implements OnModuleInit {
export class AppService {
  // constructor(private configService: ConfigService) {}
  constructor(
    @InjectRepository(Name)
    private namesRepository: Repository<Name>,
  ) {}

  // TEMPORARY: just check if .env is being read correctly - success
  // onModuleInit() {
  //   const username = this.configService.get<string>('DATABASE_USERNAME');
  //   console.log('database user env variable:', username);
  // }

  // async because we are going to use database.
  async addName(name: object) {
    // take the name and save it in the names table
    await this.namesRepository.save(name);
    return await this.getNames();
  }

  async getNames() {
    const names = await this.namesRepository.find();
    console.log('backend: names ==>', names);
    return names;
  }
}
