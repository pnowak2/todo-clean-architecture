import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from '../../../../../core/domain/service/localstorage.service';
import { TodoEntity } from '../../../domain/entity/todo.entity';
import { TodoRepository } from '../../../domain/repository/todo.repository';

export class TodoLocalStorageRepository implements TodoRepository {
  constructor(private localStorageService: LocalStorageService) {}

  public getAllTodos(): Observable<TodoEntity[]> {
    return of(this.localStorageService.getItem('todos'));
  }

  public getCompletedTodos(): Observable<TodoEntity[]> {
    throw Error('not implemented');
  }

  public getActiveTodos(): Observable<TodoEntity[]> {
    throw Error('not implemented');
  }

  public getActiveTodosCount(): Observable<number> {
    return this.getActiveTodos().pipe(map(todos => todos.length));
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

  public markAllTodosAsActive(): Observable<TodoEntity[]> {
    throw Error('not implemented');
  }
}
