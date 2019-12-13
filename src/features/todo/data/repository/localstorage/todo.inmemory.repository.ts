import { TodoRepository } from "../../../domain/repository/todo.repository";
import { Todo } from "../../../domain/model/todo.model";
import { Observable } from "rxjs";

export class TodoLocalStorageRepository implements TodoRepository {
  getAllTodos(): Observable<Array<Todo>> {
    throw Error('not implemented');
  }

  getCompletedTodos(): Observable<Array<Todo>> {
    throw Error('not implemented');
  }

  getIncompletedTodos(): Observable<Array<Todo>> {
    throw Error('not implemented');
  }

  searchTodos(keyword: string): Observable<Array<Todo>> {
    throw Error('not implemented');
  }

  addTodo(name: string): Observable<Todo> {
    throw Error('not implemented');
  }

  getTodoById(id: string): Observable<Todo> {
    throw Error('not implemented');
  }

  removeTodo(id: string): Observable<Todo> {
    throw Error('not implemented');
  }

  markTodoAsCompleted(id: string, isCompleted: boolean): Observable<Todo> {
    throw Error('not implemented');
  }
}