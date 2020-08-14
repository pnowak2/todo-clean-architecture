import { Observable } from 'rxjs';
import { UseCase } from '../../../../core/domain/usecase/usecase';
import { TodoEntity } from '../entity/todo.entity';
import { TodoRepository } from '../repository/todo.repository';

export type FilterType = 'active' | 'completed' | 'all' | null;

export interface FilterTodosUseCaseDTO {
  filter: FilterType;
}
export class FilterTodosUseCase implements UseCase<FilterTodosUseCaseDTO, TodoEntity[]> {
  constructor(private todoRepository: TodoRepository) {}

  execute(request: FilterTodosUseCaseDTO): Observable<TodoEntity[]> {
    if (request.filter === 'active') {
      return this.todoRepository.getActiveTodos();
    } else if (request.filter === 'completed') {
      return this.todoRepository.getCompletedTodos();
    } else {
      return this.todoRepository.getAllTodos();
    }
  }
}
