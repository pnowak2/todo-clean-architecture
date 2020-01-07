import { Mapper } from '../../../../core/common/mapper';
import { Name } from '../../domain/entity/name.vo';
import { TodoEntity } from '../../domain/entity/todo.entity';
import { TodoVM } from '../viewmodel/todos.viewmodel';

export class TodoViewModelMapper implements Mapper<TodoEntity, TodoVM> {
  mapFrom(input: TodoEntity): TodoVM {
    return { id: input.id.toString(), name: input.name.value, completed: input.completed };
  }

  mapTo(input: TodoVM): TodoEntity {
    return { name: Name.create(input.name), completed: input.completed };
  }
}
