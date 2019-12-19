import { Observable } from 'rxjs';
import { UseCase } from '../../../../core/domain/usecase/usecase';
import { TodoEntity } from '../entity/todo.entity';
import { TodoRepository } from '../repository/todo.repository';

export type FilterType = 'active' | 'completed' | 'all' | null;

export class FilterTodosUseCase implements UseCase<FilterType, TodoEntity[]> {
  constructor(private todoRepository: TodoRepository) { }

  execute(filter: FilterType): Observable<TodoEntity[]> {
    if (filter === 'active') {
      return this.todoRepository.getActiveTodos();
    } else if (filter === 'completed') {
      return this.todoRepository.getCompletedTodos();
    } else {
      return this.todoRepository.getAllTodos();
    }
  }
}
