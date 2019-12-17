import { Observable } from 'rxjs';
import { TodoEntity } from '../entity/todo.entity';

export abstract class TodoRepository {
  public abstract getAllTodos(): Observable<TodoEntity[]>;
  public abstract getCompletedTodos(): Observable<TodoEntity[]>;
  public abstract getIncompletedTodos(): Observable<TodoEntity[]>;
  public abstract searchTodos(keyword: string): Observable<TodoEntity[]>;
  public abstract addTodo(name: string): Observable<TodoEntity>;
  public abstract removeTodo(id: string): Observable<TodoEntity>;
  public abstract removeCompletedTodos(): Observable<TodoEntity[]>;
  public abstract getTodoById(id: string): Observable<TodoEntity>;
  public abstract markTodoAsCompleted(id: string, isCompleted: boolean): Observable<TodoEntity>;
  public abstract markAllTodosAsCompleted(): Observable<TodoEntity[]>;
  public abstract markAllTodosAsIncompleted(): Observable<TodoEntity[]>;
}
