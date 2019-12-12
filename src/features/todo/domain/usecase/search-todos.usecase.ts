import { UseCase } from "../../../../base/usecase";
import { Todo } from "../model/todo.model";
import { Observable } from "rxjs";
import { TodoRepository } from "../repository/todo.repository";

export class SearchTodosUseCase implements UseCase<string, Array<Todo>> {
  constructor(private todoRepository: TodoRepository) { }

  execute(keyword: string): Observable<Array<Todo>> {
    return this.todoRepository.searchTodos(keyword);
  }
}