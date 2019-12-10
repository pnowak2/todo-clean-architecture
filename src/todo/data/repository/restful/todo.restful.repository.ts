import { TodoRepository } from "../../../domain/repository/todo.repository";
import { Todo } from "../../../domain/model/todo.model";
import { from, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import * as axios from "axios";
import { TodoRestfulRepositoryMapper } from "./todo.mapper";

export class TodoRestfulRepository implements TodoRepository {
  mapper = new TodoRestfulRepositoryMapper();

  getAllTodos(): Observable<Array<Todo>> {
    return from(axios.default.get('http://www.mocky.io/v2/5df017ae2f000038c48e0f1d'))
      .pipe(
        tap(console.log),
        map(res => res.data.body.todos),
        map(todos => todos.map(this.mapper.mapFrom))
      );
  }
}