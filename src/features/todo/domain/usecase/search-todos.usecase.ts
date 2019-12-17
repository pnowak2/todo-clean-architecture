import { Observable } from 'rxjs';
import { UseCase } from '../../../../core/domain/usecase/usecase';
import { TodoEntity } from '../entity/todo.entity';
import { TodoRepository } from '../repository/todo.repository';

export type FilterType = 'active' | 'completed' | null;

export class SearchTodosUseCase implements UseCase<FilterType, TodoEntity[]> {
  constructor(private todoRepository: TodoRepository) { }

  execute(filterType: FilterType): Observable<TodoEntity[]> {
    if (filterType === 'active') {
      return this.todoRepository.getIncompletedTodos();
    } else if (filterType === 'completed') {
      return this.todoRepository.getCompletedTodos();
    } else {
      return this.todoRepository.getAllTodos();
    }
  }
}
