import { TodoRepository } from "../../domain/repository/todo.repository";
import { Todo } from "../../domain/model/todo.model";
import { from, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import  * as axios from "axios";

export class TodoRestfulRepository implements TodoRepository {
  getAllTodos(): Observable<Array<Todo>> {
    return from(axios.default.get('http://www.mocky.io/v2/5df002e02f000038c48e0edc')).pipe(
      map(res => res.data.body.todos),
      map(todos => todos.map((todojson: any) => { name: 'test'}))
    );
  }
}