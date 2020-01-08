import { Mapper } from '../../../../shared/core/mapper';
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id';
import { TodoEntity } from '../../domain/entity/todo.entity';
import { TodoVM } from '../viewmodel/todos.viewmodel';

export class TodoViewModelMapper implements Mapper<TodoEntity, TodoVM> {
  mapFrom(input: TodoEntity): TodoVM {
    return {
      id: input.todoId.id.toString(),
      name: input.name,
      completed: input.completed
    };
  }

  mapTo(input: TodoVM): TodoEntity {
    const todoOrError = TodoEntity.create({
      name: input.name,
      completed: input.completed
    }, new UniqueEntityID(input.id))

    if(todoOrError.isFailure) {
      return null;
    }

    return todoOrError.getValue();
  }
}
