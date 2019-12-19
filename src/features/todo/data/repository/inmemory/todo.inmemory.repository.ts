import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoEntity } from '../../../domain/entity/todo.entity';
import { TodoRepository } from '../../../domain/repository/todo.repository';
import { TodoMockMapper } from './mapper/todo-mock.mapper';
import { TodoMockModel } from './model/todo-mock.model';

export class TodoInMemoryRepository implements TodoRepository {
  constructor(private data: TodoMockModel[] = []) { }

  private mapper = new TodoMockMapper();

  public getAllTodos(): Observable<TodoEntity[]> {
    return of(this.data)
      .pipe(
        map(mocks => mocks.map(this.mapper.mapTo))
      );
  }

  public getCompletedTodos(): Observable<TodoEntity[]> {
    return of(this.data.filter(todo => todo.completed))
      .pipe(
        map(mocks => mocks.map(this.mapper.mapTo))
      );
  }

  public getActiveTodos(): Observable<TodoEntity[]> {
    return of(this.data.filter(todo => !todo.completed))
      .pipe(
        map(mocks => mocks.map(this.mapper.mapTo))
      );
  }

  public getActiveTodosCount(): Observable<number> {
    return this.getActiveTodos().pipe(
      map(todos => todos.length)
    );
  }

  public addTodo(name: string): Observable<TodoEntity> {
    const id = 'item-' + new Date().getTime();
    const todo: TodoEntity = { id, name };

    this.data.push(this.mapper.mapFrom(todo));
    return of(todo);
  }

  public getTodoById(id: string): Observable<TodoEntity> {
    return of(this.data.find(todo => todo.id === id))
      .pipe(
        map(this.mapper.mapTo)
      )
  }

  public removeTodo(id: string): Observable<TodoEntity> {
    const idx = this.data.findIndex(t => t.id === id);
    const todo = this.data.find(t => t.id === id);

    this.data.splice(idx, 1);

    return of(todo)
      .pipe(
        map(this.mapper.mapTo)
      );
  }

  public removeCompletedTodos(): Observable<TodoEntity[]> {
    const activeTodos = this.data.filter(todo => !todo.completed);
    this.data = [...activeTodos];

    return of(activeTodos)
      .pipe(
        map(mocks => mocks.map(this.mapper.mapTo))
      );
  }

  public markTodoAsCompleted(id: string, isCompleted: boolean): Observable<TodoEntity> {
    const todo = this.data.find(t => t.id === id);
    todo.completed = isCompleted;

    return of(todo)
      .pipe(
        map(this.mapper.mapTo)
      );
  }

  public markAllTodosAsCompleted(): Observable<TodoEntity[]> {
    this.data = this.data.map(todo => ({ ...todo, completed: true }));

    return of(this.data)
      .pipe(
        map(mocks => mocks.map(this.mapper.mapTo))
      );
  }

  public markAllTodosAsActive(): Observable<TodoEntity[]> {
    this.data = this.data.map(todo => ({ ...todo, completed: false }));

    return of(this.data)
      .pipe(
        map(mocks => mocks.map(this.mapper.mapTo))
      );
  }
}
