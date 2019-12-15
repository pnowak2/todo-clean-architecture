import { Observable } from 'rxjs';
import { Todo } from '../model/todo.model';

export abstract class TodoRepository {
  public abstract getAllTodos(): Observable<Todo[]>;
  public abstract getCompletedTodos(): Observable<Todo[]>;
  public abstract getIncompletedTodos(): Observable<Todo[]>;
  public abstract searchTodos(keyword: string): Observable<Todo[]>;
  public abstract addTodo(name: string): Observable<Todo>;
  public abstract removeTodo(id: string): Observable<Todo>;
  public abstract getTodoById(id: string): Observable<Todo>;
  public abstract markTodoAsCompleted(id: string, isCompleted: boolean): Observable<Todo>;
}
