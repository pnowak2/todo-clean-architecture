import { Observable } from 'rxjs';
import { UseCase } from '../../../../core/domain/usecase/usecase';
import { TodoEntity } from '../entity/todo.entity';
import { TodoRepository } from '../repository/todo.repository';

export class GetActiveTodosUseCase implements UseCase<void, TodoEntity[]> {
  constructor(private todoRepository: TodoRepository) {}

  execute(): Observable<TodoEntity[]> {
    return this.todoRepository.getActiveTodos();
  }
}
