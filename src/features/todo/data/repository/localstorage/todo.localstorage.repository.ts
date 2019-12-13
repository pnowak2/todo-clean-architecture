import { TodoRepository } from "../../../domain/repository/todo.repository";
import { Todo } from "../../../domain/model/todo.model";
import { Observable, of } from "rxjs";
import { LocalStorageService } from "../../../../../base/service/localstorage.service";
import { map } from "rxjs/operators";

export class TodoLocalStorageRepository implements TodoRepository {
  constructor(private localStorageService: LocalStorageService) { }

  getAllTodos(): Observable<Array<Todo>> {
    return of(this.localStorageService.getItem('todos'));
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
    const todos: Array<Todo> = this.localStorageService.getItem('todos') || [];
    const todo = new Todo({ id: Math.random().toString(), name: name });

    this.localStorageService.setItem('todos', [...todos, todo]);

    return of(todo);
  }

  getTodoById(id: string): Observable<Todo> {
    const todos: Array<Todo> = this.localStorageService.getItem('todos');
    return of(todos.find(todo => todo.id === id));
  }

  removeTodo(id: string): Observable<Todo> {
    throw Error('not implemented');
  }

  markTodoAsCompleted(id: string, isCompleted: boolean): Observable<Todo> {
    throw Error('not implemented');
  }
}