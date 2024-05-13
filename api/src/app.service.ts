import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getNames() {
    return {};
  }

  // async because we are going to use database.
  async addName(name: string) {
    console.log('--->', name);
    return name;
  }
}
