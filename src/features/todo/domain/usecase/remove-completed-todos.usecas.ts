import { Observable } from 'rxjs';
import { UseCase } from '../../../../core/domain/usecase/usecase';
import { Todo } from '../model/todo.model';
import { TodoRepository } from '../repository/todo.repository';

export class RemoveCompletedTodosUseCase implements UseCase<void, Todo[]> {
  constructor(private todoRepository: TodoRepository) {}

  execute(): Observable<Todo[]> {
    return this.todoRepository.removeCompletedTodos();
  }
}
