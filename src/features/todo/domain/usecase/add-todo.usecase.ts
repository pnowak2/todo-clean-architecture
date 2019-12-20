import { Observable } from 'rxjs';
import { UseCase } from '../../../../core/domain/usecase/usecase';
import { TodoEntity } from '../entity/todo.entity';
import { TodoRepository } from '../repository/todo.repository';

export interface AddTodoUseCaseDTO {
  name: string;
}

export class AddTodoUseCase implements UseCase<AddTodoUseCaseDTO, TodoEntity> {
  constructor(private todoRepository: TodoRepository) {}

  execute(request: AddTodoUseCaseDTO): Observable<TodoEntity> {
    return this.todoRepository.addTodo(request.name);
  }
}
