import { Mapper } from '../../../../../../shared/core/mapper';
import { TodoEntity } from '../../../../domain/entity/todo.entity';
import { TodoMockDto } from '../dto/todo-mock.dto';

export class TodoMockMapper implements Mapper<TodoEntity, TodoMockDto> {
  mapFrom(input: TodoEntity): TodoMockDto {
    return {
      id: input.id,
      title: input.name,
      completed: input.completed
    };
  }

  mapTo(input: TodoMockDto): TodoEntity {
    const todo = TodoEntity.create({
      id: input.id,
      name: input.title,
      completed: input.completed
    });

    return todo;
  }
}
