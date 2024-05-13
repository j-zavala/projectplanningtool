import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // the decorator indicates that this method should respond
  // to POST requests at this path (/name)
  @Post('/name')
  async addName(@Body() name: string) {
    return this.appService.addName(name);
  }

  @Get()
  async getNames() {
    return await this.appService.getNames();
  }
}
