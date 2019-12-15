import { Observable } from "rxjs";
import { UseCase } from "../../../../core/domain/usecase/usecase";
import { Todo } from "../model/todo.model";
import { TodoRepository } from "../repository/todo.repository";

export class GetAllTodosUseCase implements UseCase<void, Todo[]> {
  constructor(private todoRepository: TodoRepository) { }

  execute(): Observable<Todo[]> {
    return this.todoRepository.getAllTodos();
  }
}