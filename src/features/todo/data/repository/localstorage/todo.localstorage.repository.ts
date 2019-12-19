import { Observable, of } from 'rxjs';
import { LocalStorageService } from '../../../../../core/domain/service/localstorage.service';
import { TodoEntity } from '../../../domain/entity/todo.entity';
import { TodoRepository } from '../../../domain/repository/todo.repository';
import { map } from 'rxjs/operators';

export class TodoLocalStorageRepository implements TodoRepository {
  constructor(private localStorageService: LocalStorageService) {}

  public getAllTodos(): Observable<TodoEntity[]> {
    return of(this.localStorageService.getItem('todos'));
  }

  public getCompletedTodos(): Observable<TodoEntity[]> {
    throw Error('not implemented');
  }

  public getIncompletedTodos(): Observable<TodoEntity[]> {
    throw Error('not implemented');
  }

  public getIncompletedTodosCount(): Observable<number> {
    return this.getIncompletedTodos().pipe(
      map(todos => todos.length)
    );
  }

  public searchTodos(keyword: string): Observable<TodoEntity[]> {
    throw Error('not implemented');
  }

  public addTodo(name: string): Observable<TodoEntity> {
    const todos: TodoEntity[] = this.localStorageService.getItem('todos') || [];
    const todo = new TodoEntity({ id: Math.random().toString(), name });

    this.localStorageService.setItem('todos', [...todos, todo]);

    return of(todo);
  }

  public getTodoById(id: string): Observable<TodoEntity> {
    const todos: TodoEntity[] = this.localStorageService.getItem('todos');
    return of(todos.find(todo => todo.id === id));
  }

  public removeTodo(id: string): Observable<TodoEntity> {
    throw Error('not implemented');
  }

  public removeCompletedTodos(): Observable<TodoEntity[]> {
    throw Error('not implemented');
  }

  public markTodoAsCompleted(id: string, isCompleted: boolean): Observable<TodoEntity> {
    throw Error('not implemented');
  }

  public markAllTodosAsCompleted(): Observable<TodoEntity[]> {
    throw Error('not implemented');
  }

  public markAllTodosAsIncompleted(): Observable<TodoEntity[]> {
    throw Error('not implemented');
  }
}
