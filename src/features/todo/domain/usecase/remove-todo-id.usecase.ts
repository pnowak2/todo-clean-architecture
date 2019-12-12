import { UseCase } from "../../../../base/usecase";
import { Todo } from "../model/todo.model";
import { Observable, } from "rxjs";
import { TodoRepository } from "../repository/todo.repository";

export class RemoveTodoUseCase implements UseCase<string, Todo> {
  constructor(private todoRepository: TodoRepository) { }

  execute(id: string): Observable<Todo> {
    return this.todoRepository.removeTodo(id);
  }
}