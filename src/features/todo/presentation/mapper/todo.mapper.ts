import { Mapper } from '../../../../core/common/mapper';
import { TodoEntity } from '../../domain/entity/todo.entity';
import { TodoVM } from '../viewmodel/todos.viewmodel';

export class TodoViewModelMapper implements Mapper<TodoEntity, TodoVM> {
  mapFrom(input: TodoEntity): TodoVM {
    return { id: input.id, name: input.name, completed: input.completed };
  }

  mapTo(input: TodoVM): TodoEntity {
    return { id: input.id, name: input.name, completed: input.completed };
  }
}
