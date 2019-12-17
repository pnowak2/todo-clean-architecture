import { Observable } from 'rxjs';
import { UseCase } from '../../../../core/domain/usecase/usecase';
import { TodoEntity } from '../entity/todo.entity';
import { TodoRepository } from '../repository/todo.repository';

export class MarkTodoAsIncompletedUseCase implements UseCase<string, TodoEntity> {
  constructor(private todoRepository: TodoRepository) {}

  execute(id: string): Observable<TodoEntity> {
    return this.todoRepository.markTodoAsCompleted(id, false);
  }
}
