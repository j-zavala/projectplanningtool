import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TodoEntity } from './todos.entity';
import { TodoDTO } from './todos.controller';

@Injectable()
export class TodosService {
  private todoRepository;

  constructor(private datasource: DataSource) {
    this.todoRepository = this.datasource.getRepository(TodoEntity);
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  async create(todo: TodoDTO) {
    await this.todoRepository.save(todo);
    return await this.findAll();
  }

  // Partial<TodoDTO> is a type that represents a partial of the TodoDTO type
  // This means that it can be used to update a todo without having to pass all the properties
  async update(id: number, todoUpdate: Partial<TodoDTO>) {
    const existingTodo = await this.todoRepository.findOne({ where: { id } });
    if (!existingTodo) {
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }

    // Merge the existing todo with the update
    const updatedTodo = { ...existingTodo, ...todoUpdate };

    // Perform the update
    const result = await this.todoRepository.save(updatedTodo);

    console.log('Update result:', result);

    return result;
  }

  async delete(id: number) {
    await this.todoRepository.delete(id);
    return await this.findAll();
  }
}
