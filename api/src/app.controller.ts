import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Post('/name')
  // async addName(
  //   @Body('firstName') firstName: string,
  //   @Body('lastName') lastName: string,
  // ) {
  //   console.log(firstName, lastName);
  //   return this.appService.addName(firstName, lastName);
  // }

  // @Get()
  // async getNames() {
  //   return await this.appService.getNames();
  // }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
