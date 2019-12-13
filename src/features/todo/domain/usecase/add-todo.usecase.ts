import { Observable } from "rxjs";
import { UseCase } from "../../../../core/domain/usecase/usecase";
import { Todo } from "../model/todo.model";
import { TodoRepository } from "../repository/todo.repository";

export class AddTodoUseCase implements UseCase<string, Todo> {
  constructor(private todoRepository: TodoRepository) { }

  execute(name: string): Observable<Todo> {
    return this.todoRepository.addTodo(name);
  }
}