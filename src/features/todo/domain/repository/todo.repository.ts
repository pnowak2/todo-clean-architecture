import { Observable } from 'rxjs';
import { Result } from '../../../../core/domain/common/result';
import { TodoEntity } from '../entity/todo.entity';

export abstract class TodoRepository {
  public abstract getAllTodos(): Observable<TodoEntity[]>;
  public abstract getCompletedTodos(): Observable<TodoEntity[]>;
  public abstract getActiveTodos(): Observable<TodoEntity[]>;
  public abstract getActiveTodosCount(): Observable<number>;
  public abstract addTodo(name: string): Observable<Result<TodoEntity>>;
  public abstract removeTodo(id: string): Observable<TodoEntity>;
  public abstract removeCompletedTodos(): Observable<TodoEntity[]>;
  public abstract getTodoById(id: string): Observable<TodoEntity>;
  public abstract markTodoAsCompleted(id: string, isCompleted: boolean): Observable<TodoEntity>;
  public abstract markAllTodosAsCompleted(): Observable<TodoEntity[]>;
  public abstract markAllTodosAsActive(): Observable<TodoEntity[]>;
}
