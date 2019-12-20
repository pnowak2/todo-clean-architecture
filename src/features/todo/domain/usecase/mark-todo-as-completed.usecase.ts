import { Observable } from 'rxjs';
import { UseCase } from '../../../../core/domain/usecase/usecase';
import { TodoEntity } from '../entity/todo.entity';
import { TodoRepository } from '../repository/todo.repository';

export interface MarkTodoAsCompletedUseCaseDto {
  id: string;
}

export class MarkTodoAsCompletedUseCase implements UseCase<MarkTodoAsCompletedUseCaseDto, TodoEntity> {
  constructor(private todoRepository: TodoRepository) {}

  execute(request: MarkTodoAsCompletedUseCaseDto): Observable<TodoEntity> {
    return this.todoRepository.markTodoAsCompleted(request.id, true);
  }
}
