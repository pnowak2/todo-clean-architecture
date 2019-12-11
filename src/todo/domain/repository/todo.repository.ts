import { Todo } from "../model/todo.model";
import { Observable } from "rxjs";

export abstract class TodoRepository {
  abstract getAllTodos(): Observable<Array<Todo>>;
  abstract searchTodos(keyword: string): Observable<Array<Todo>>;
  abstract addTodo(name: string): Observable<Todo>;
  abstract removeTodo(id: string): Observable<Todo>;
}