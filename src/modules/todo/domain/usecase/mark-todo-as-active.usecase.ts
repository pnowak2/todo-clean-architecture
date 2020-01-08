import { Observable } from 'rxjs';
import { UseCase } from '../../../../shared/core/usecase';
import { TodoEntity } from '../entity/todo.entity';
import { TodoRepository } from '../repository/todo.repository';

export interface MarkTodoAsActiveUseCaseDto {
  id: string;
}

export class MarkTodoAsActiveUseCase implements UseCase<MarkTodoAsActiveUseCaseDto, TodoEntity> {
  constructor(private todoRepository: TodoRepository) {}

  execute(request: MarkTodoAsActiveUseCaseDto): Observable<TodoEntity> {
    return this.todoRepository.markTodoAsCompleted(request.id, false);
  }
}
