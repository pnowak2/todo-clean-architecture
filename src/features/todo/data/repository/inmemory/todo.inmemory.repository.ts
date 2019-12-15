import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Todo } from "../../../domain/model/todo.model";
import { TodoRepository } from "../../../domain/repository/todo.repository";

const todosDB = [
  new Todo({ id: '1', name: 'todo 1', completed: true }),
  new Todo({ id: '2', name: 'todo 2' }),
  new Todo({ id: '3', name: 'todo 3' }),
];

export class TodoInMemoryRepository implements TodoRepository {
  public getAllTodos(): Observable<Todo[]> {
    return of(todosDB);
  }

  public getCompletedTodos(): Observable<Todo[]> {
    return of(todosDB.filter(todo => todo.completed));
  }

  public getIncompletedTodos(): Observable<Todo[]> {
    return of(todosDB.filter(todo => !todo.completed));
  }

  public searchTodos(keyword: string): Observable<Todo[]> {
    return this.getAllTodos().pipe(
      map(todos => todos.filter(todo => todo.name.includes(keyword)))
    );
  }

  public addTodo(name: string): Observable<Todo> {
    const id = 'item-' + new Date().getTime();
    const todo: Todo = { id, name };

    todosDB.push(todo);
    return of(todo);
  }

  public getTodoById(id: string): Observable<Todo> {
    return of(todosDB.find(todo => todo.id === id));
  }

  public removeTodo(id: string): Observable<Todo> {
    const idx = todosDB.findIndex(t => t.id === id);
    const todo = todosDB.find(t => t.id === id);

    todosDB.splice(idx ,1);

    return of(todo);
  }

  public markTodoAsCompleted(id: string, isCompleted: boolean): Observable<Todo> {
    const todo = todosDB.find(t => t.id === id);
    todo.completed = isCompleted;

    return of(todo);
  }
}