import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import * as _ from 'lodash';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    try {
      if (_.isNil(createTodoDto.task)) {
        throw new Error("Task isn't null or undefined.");
      }

      if (createTodoDto.task == '') {
        throw new Error("Task isn't empty string.");
      }

      const result = this.todosService.create(createTodoDto);

      return {
        success: true,
        message: 'new uuid : ' + result,
        data: result,
      };
    } catch (error) {
      return { success: false, message: error.message, data: [] };
    }
  }

  @Get()
  findAll() {
    try {
      const result = this.todosService.findAll();
      return {
        success: true,
        message: _.isEmpty(result) ? 'Task is empty.' : 'get all task.',
        data: result,
      };
    } catch (error) {
      return { success: false, message: error.message, data: [] };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const result = this.todosService.findOne(id);
      return {
        success: true,
        message: _.isEmpty(result) ? 'Task not found.' : `Found task id ${id}`,
        data: result,
      };
    } catch (error) {
      return { success: false, message: error.message, data: [] };
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    try {
      const result = this.todosService.update(id, updateTodoDto);
      if (result) {
        return {
          success: true,
          message: `task id ${id} update complete.`,
          data: result,
        };
      } else {
        return {
          success: true,
          message: `task id ${id} not found in task list.`,
          data: null,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: [],
      };
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      const result = this.todosService.remove(id);
      if (result) {
        return {
          success: true,
          message: `task id ${id} remove complete.`,
          data: result,
        };
      } else {
        return {
          success: true,
          message: `task id ${id} not found in task list.`,
          data: null,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: [],
      };
    }
  }
}
