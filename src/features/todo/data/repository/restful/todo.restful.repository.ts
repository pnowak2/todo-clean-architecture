import { TodoRepository } from "../../../domain/repository/todo.repository";
import { Todo } from "../../../domain/model/todo.model";
import { from, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import * as axios from "axios";
import { TodoRestfulRepositoryMapper } from "./todo.mapper";

export class TodoRestfulRepository implements TodoRepository {
  mapper = new TodoRestfulRepositoryMapper();

  getAllTodos(): Observable<Array<Todo>> {
    return from(axios.default.get('http://www.mocky.io/v2/5df017ae2f000038c48e0f1d'))
      .pipe(
        map(res => res.data.body.todos),
        map(todos => todos.map(this.mapper.mapFrom))
      );
  }

  getCompletedTodos(): Observable<Array<Todo>> {
    throw new Error('not implemented');
  }

  getIncompletedTodos(): Observable<Array<Todo>> {
    throw new Error('not implemented');
  }

  searchTodos(keyword: string): Observable<Array<Todo>> {
    throw new Error('not implemented');
  }

  addTodo(name: string): Observable<Todo> {
    throw new Error('not implemented');
  }

  getTodoById(id: string): Observable<Todo> {
    throw new Error('not implemented');
  }

  removeTodo(id: string): Observable<Todo> {
    throw new Error('not implemented');
  }

  markTodoAsCompleted(id: string, isCompleted: boolean): Observable<Todo> {
    throw new Error('not implemented');
  }
}