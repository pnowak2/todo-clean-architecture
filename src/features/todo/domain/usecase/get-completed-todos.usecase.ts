import { UseCase } from "../../../../core/domain/usecase/usecase";
import { Todo } from "../model/todo.model";
import { Observable } from "rxjs";
import { TodoRepository } from "../repository/todo.repository";

export class GetCompletedTodosUseCase implements UseCase<void, Array<Todo>> {
  constructor(private todoRepository: TodoRepository) { }

  execute(): Observable<Array<Todo>> {
    return this.todoRepository.getCompletedTodos();
  }
}