import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoList } from './entities/todo.entity';
import { v4 as UUID } from 'uuid';

@Injectable()
export class TodosService {
  todoList: TodoList[] = [];

  create(createTodoDto: CreateTodoDto) {
    try {
      const newUuid = UUID();
      const newList: TodoList = {
        id: newUuid,
        task: createTodoDto.task,
        done: false,
      };
      this.todoList.push(newList);
      return newUuid;
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    try {
      return this.todoList;
    } catch (error) {
      throw new Error(error);
    }
  }

  findOne(id: string) {
    try {
      const findById = this.todoList.find((item: TodoList) => item.id === id);
      return findById;
    } catch (error) {
      throw new Error(error);
    }
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    try {
      const findById = this.todoList.findIndex(
        (item: TodoList) => item.id === id,
      );
      if (findById >= 0) {
        this.todoList[findById] = {
          ...this.todoList[findById],
          ...updateTodoDto,
        };

        return id;
      } else {
        return undefined;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  remove(id: string) {
    try {
      const findExistId = this.todoList.find(
        (item: TodoList) => item.id === id,
      );

      if (findExistId) {
        const newList = this.todoList.filter((item: TodoList) => item.id != id);
        this.todoList = newList;
        return id;
      } else {
        return undefined;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
