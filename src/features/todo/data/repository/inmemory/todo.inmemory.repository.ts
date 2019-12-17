import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoEntity } from '../../../domain/entity/todo.entity';
import { TodoRepository } from '../../../domain/repository/todo.repository';

let todosDB = [
  new TodoEntity({ id: '1', name: 'todo 1', completed: true }),
  new TodoEntity({ id: '2', name: 'todo 2' }),
  new TodoEntity({ id: '3', name: 'todo 3' }),
];

export class TodoInMemoryRepository implements TodoRepository {
  public getAllTodos(): Observable<TodoEntity[]> {
    return of(todosDB);
  }

  public getCompletedTodos(): Observable<TodoEntity[]> {
    return of(todosDB.filter(todo => todo.completed));
  }

  public getIncompletedTodos(): Observable<TodoEntity[]> {
    return of(todosDB.filter(todo => !todo.completed));
  }

  public searchTodos(keyword: string): Observable<TodoEntity[]> {
    return this.getAllTodos().pipe(map(todos => todos.filter(todo => todo.name.includes(keyword))));
  }

  public addTodo(name: string): Observable<TodoEntity> {
    const id = 'item-' + new Date().getTime();
    const todo: TodoEntity = { id, name };

    todosDB.push(todo);
    return of(todo);
  }

  public getTodoById(id: string): Observable<TodoEntity> {
    return of(todosDB.find(todo => todo.id === id));
  }

  public removeTodo(id: string): Observable<TodoEntity> {
    const idx = todosDB.findIndex(t => t.id === id);
    const todo = todosDB.find(t => t.id === id);

    todosDB.splice(idx, 1);

    return of(todo);
  }

  public removeCompletedTodos(): Observable<TodoEntity[]> {
    const incompletedTodos = todosDB.filter(todo => !todo.completed);
    todosDB = [...incompletedTodos];

    return of(incompletedTodos);
  }

  public markTodoAsCompleted(id: string, isCompleted: boolean): Observable<TodoEntity> {
    const todo = todosDB.find(t => t.id === id);
    todo.completed = isCompleted;

    return of(todo);
  }

  public markAllTodosAsCompleted(): Observable<TodoEntity[]> {
    return of(todosDB.map(todo => ({ ...todo, completed: true })));
  }

  public markAllTodosAsIncompleted(): Observable<TodoEntity[]> {
    return of(todosDB.map(todo => ({ ...todo, completed: false })));
  }
}
