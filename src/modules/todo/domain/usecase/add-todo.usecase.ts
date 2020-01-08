import { Observable } from 'rxjs';
import { UseCase } from '../../../../shared/core/usecase';
import { TodoEntity } from '../entity/todo.entity';
import { TodoRepository } from '../repository/todo.repository';

export interface AddTodoUseCaseDTO {
  name: string;
}

export class AddTodoUseCase implements UseCase<AddTodoUseCaseDTO, void> {
  constructor(private todoRepository: TodoRepository) {}

  execute(request: AddTodoUseCaseDTO): Observable<void> {
    return this.todoRepository.addTodo(request.name);
  }
}
