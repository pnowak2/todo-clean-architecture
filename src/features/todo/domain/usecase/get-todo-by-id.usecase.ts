import { UseCase } from "../../../../base/usecase";
import { Todo } from "../model/todo.model";
import { Observable, throwError, of } from "rxjs";
import { TodoRepository } from "../repository/todo.repository";
import { mergeMap } from "rxjs/operators";

export class GetTodoByIdUseCase implements UseCase<string, Todo> {
  constructor(private todoRepository: TodoRepository) { }

  execute(id: string): Observable<Todo> {
    return this.todoRepository.getTodoById(id);
  }
}