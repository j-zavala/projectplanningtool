import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Name } from './name.entity';
// import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  // constructor(
  //   @InjectRepository(Name)
  //   private namesRepository: Repository<Name>,
  // ) {}

  // async addName(firstName: string, lastName: string): Promise<Name[]> {
  //   await this.namesRepository.save({
  //     first_name: firstName,
  //     last_name: lastName,
  //   });
  //   return await this.getNames();
  // }

  // async getNames(): Promise<Name[]> {
  //   return await this.namesRepository.find();
  // }

  getHello(): string {
    return 'cats were here';
  }
}
