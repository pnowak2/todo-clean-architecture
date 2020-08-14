import { Observable } from 'rxjs';
import { UseCase } from '../../../../core/domain/usecase/usecase';
import { TodoEntity } from '../entity/todo.entity';
import { TodoRepository } from '../repository/todo.repository';

export interface GetTodoByIdUseCaseDto {
  id: string;
}

export class GetTodoByIdUseCase implements UseCase<GetTodoByIdUseCaseDto, TodoEntity> {
  constructor(private todoRepository: TodoRepository) {}

  execute(request: GetTodoByIdUseCaseDto): Observable<TodoEntity> {
    return this.todoRepository.getTodoById(request.id);
  }
}
