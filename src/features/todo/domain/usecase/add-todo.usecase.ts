import { Observable } from 'rxjs';
import { Either } from '../../../../core/domain/common/either';
import { Result } from '../../../../core/domain/common/result';
import { UseCase } from '../../../../core/domain/usecase/usecase';
import { TodoEntity } from '../entity/todo.entity';
import { CreateTodoError } from '../error/todo.error';
import { TodoRepository } from '../repository/todo.repository';

export interface Request {
  name: string;
}

type Response = Either<
  Result<CreateTodoError.NameInvalidError>
  ,
  Result<TodoEntity>
>

export class AddTodoUseCase implements UseCase<Request, Response> {
  constructor(private todoRepository: TodoRepository) { }

  execute(request: Request): Observable<Response> {
    const todoOrError = this.todoRepository.addTodo(request.name);

    return todoOrError;
  }
}
