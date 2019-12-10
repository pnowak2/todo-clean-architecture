import { UseCase } from "../../../base/usecase";
import { Todo } from "../model/todo.model";
import { Observable, of } from "rxjs";
import { TodoRepository } from "../repository/todo.repository";

export class GetAllTodosUseCase implements UseCase<void, Array<Todo>> {
  constructor(private todoRepository: TodoRepository) { }

  execute(): Observable<Array<Todo>> {
    return of(this.todoRepository.getAllTodos());
  }
}