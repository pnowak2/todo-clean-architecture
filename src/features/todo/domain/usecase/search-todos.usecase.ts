import { Observable } from 'rxjs';
import { UseCase } from '../../../../core/domain/usecase/usecase';
import { TodoEntity } from '../entity/todo.entity';
import { TodoRepository } from '../repository/todo.repository';

export class SearchTodosUseCase implements UseCase<string, TodoEntity[]> {
  constructor(private todoRepository: TodoRepository) { }

  execute(filterType: string): Observable<TodoEntity[]> {
    if (filterType === 'active') {
      return this.todoRepository.getIncompletedTodos();
    } else if (filterType === 'completed') {
      return this.todoRepository.getCompletedTodos();
    } else {
      return this.todoRepository.getAllTodos();
    }
  }
}
