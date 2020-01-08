import { Observable } from 'rxjs';
import { UseCase } from '../../../../shared/core/usecase';
import { TodoEntity } from '../entity/todo.entity';
import { TodoRepository } from '../repository/todo.repository';

export interface RemoveTodoUseCaseDto {
  id: string;
}

export class RemoveTodoUseCase implements UseCase<RemoveTodoUseCaseDto, TodoEntity> {
  constructor(private todoRepository: TodoRepository) {}

  execute(request: RemoveTodoUseCaseDto): Observable<TodoEntity> {
    return this.todoRepository.removeTodo(request.id);
  }
}
