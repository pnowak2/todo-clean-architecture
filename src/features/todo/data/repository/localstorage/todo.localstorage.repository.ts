import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PersistencyService } from '../../../../../shared/domain/service/persistency.service';
import { TodoEntity } from '../../../domain/entity/todo.entity';
import { TodoRepository } from '../../../domain/repository/todo.repository';

export class TodoLocalStorageRepository implements TodoRepository {
  constructor(private persistencyService: PersistencyService) {}

  public getAllTodos(): Observable<TodoEntity[]> {
    return of(this.persistencyService.getItem('todos'));
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
    const todos: TodoEntity[] = this.persistencyService.getItem('todos') || [];
    const todo = TodoEntity.create({ id: Math.random().toString(), name });

    this.persistencyService.setItem('todos', [...todos, todo]);

    return of(todo);
  }

  public getTodoById(id: string): Observable<TodoEntity> {
    const todos: TodoEntity[] = this.persistencyService.getItem('todos');
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
