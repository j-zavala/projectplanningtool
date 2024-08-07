import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodosService } from './todos.service';

export interface TodoDTO {
  id: number;
  title: string;
  description: string;
  done: boolean;
  createdAt?: Date;
}

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  async findAll() {
    return await this.todoService.findAll();
  }

  @Post()
  async create(@Body() todo: TodoDTO) {
    return await this.todoService.create(todo);
  }

  // @Put(':id') specifies that the id will be part of the URL path
  @Put(':id')
  // @Param('id') extracts the id from the URL path
  // @Body() gets the todo from the entire request body
  async update(@Param('id') id: number, @Body('todo') todo: Partial<TodoDTO>) {
    console.log('Updating todo:', todo);
    return await this.todoService.update(id, todo);
  }

  @Delete()
  async delete(@Body() id: number) {
    return await this.todoService.delete(id);
  }
}
