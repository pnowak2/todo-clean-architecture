import { Mapper } from '../../../core/domain/model/mapper';
import { Todo } from '../domain/model/todo.model';
import { TodoVM } from './state/todos.state';

export class TodoViewModelMapper implements Mapper<Todo, TodoVM> {
  mapFrom(input: Todo): TodoVM {
    return { id: input.id, name: input.name, completed: input.completed };
  }

  mapTo(input: TodoVM): Todo {
    return { id: input.id, name: input.name, completed: input.completed };
  }
}
