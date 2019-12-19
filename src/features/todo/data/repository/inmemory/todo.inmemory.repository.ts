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

  public getIncompletedTodos(): Observable<TodoEntity[]> {
    return of(this.data.filter(todo => !todo.completed))
      .pipe(
        map(mocks => mocks.map(this.mapper.mapTo))
      );
  }

  public getIncompletedTodosCount(): Observable<number> {
    return this.getIncompletedTodos().pipe(
      map(todos => todos.length)
    );
  }

  public searchTodos(keyword: string): Observable<TodoEntity[]> {
    return this.getAllTodos()
      .pipe(
        map(todos => todos.filter(todo => todo.name.includes(keyword)))
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
    const incompletedTodos = this.data.filter(todo => !todo.completed);
    this.data = [...incompletedTodos];

    return of(incompletedTodos)
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

  public markAllTodosAsIncompleted(): Observable<TodoEntity[]> {
    this.data = this.data.map(todo => ({ ...todo, completed: false }));

    return of(this.data)
      .pipe(
        map(mocks => mocks.map(this.mapper.mapTo))
      );
  }
}
