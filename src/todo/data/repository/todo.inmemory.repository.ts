import { TodoRepository } from "../../domain/repository/todo.repository";
import { Todo } from "../../domain/model/todo.model";
import { Observable, of } from "rxjs";

export class TodoInMemoryRepository implements TodoRepository {
  getAllTodos(): Observable<Array<Todo>> {
    return of([
      { name: 'todo2' }
    ]);
  }
}