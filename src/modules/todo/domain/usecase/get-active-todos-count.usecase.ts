import { Observable } from 'rxjs';
import { UseCase } from '../../../../shared/core/usecase';
import { TodoRepository } from '../repository/todo.repository';

export class GetActiveTodosCountUseCase implements UseCase<void, number> {
  constructor(private todoRepository: TodoRepository) {}

  execute(): Observable<number> {
    return this.todoRepository.getActiveTodosCount();
  }
}
