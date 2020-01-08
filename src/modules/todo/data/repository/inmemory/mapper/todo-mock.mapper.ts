import { Mapper } from '../../../../../../shared/core/mapper';
import { UniqueEntityID } from '../../../../../../shared/domain/unique-entity-id';
import { TodoEntity } from '../../../../domain/entity/todo.entity';
import { TodoMockDto } from '../dto/todo-mock.dto';

export class TodoMockMapper implements Mapper<TodoEntity, TodoMockDto> {
  mapFrom(input: TodoEntity): TodoMockDto {
    return {
      id: input.todoId.id.toString(),
      title: input.name,
      completed: input.completed
    };
  }

  mapTo(input: TodoMockDto): TodoEntity {
    const todo = TodoEntity.create({
      name: input.title,
      completed: input.completed
    }, new UniqueEntityID(input.id));

    return todo.getValue();
  }
}
