import { Observable, of } from 'rxjs';
import { LocalStorageService } from '../../../../../core/domain/service/localstorage.service';
import { Todo } from '../../../domain/model/todo.model';
import { TodoRepository } from '../../../domain/repository/todo.repository';

export class TodoLocalStorageRepository implements TodoRepository {
  constructor(private localStorageService: LocalStorageService) {}

  public getAllTodos(): Observable<Todo[]> {
    return of(this.localStorageService.getItem('todos'));
  }

  public getCompletedTodos(): Observable<Todo[]> {
    throw Error('not implemented');
  }

  public getIncompletedTodos(): Observable<Todo[]> {
    throw Error('not implemented');
  }

  public searchTodos(keyword: string): Observable<Todo[]> {
    throw Error('not implemented');
  }

  public addTodo(name: string): Observable<Todo> {
    const todos: Todo[] = this.localStorageService.getItem('todos') || [];
    const todo = new Todo({ id: Math.random().toString(), name });

    this.localStorageService.setItem('todos', [...todos, todo]);

    return of(todo);
  }

  public getTodoById(id: string): Observable<Todo> {
    const todos: Todo[] = this.localStorageService.getItem('todos');
    return of(todos.find(todo => todo.id === id));
  }

  public removeTodo(id: string): Observable<Todo> {
    throw Error('not implemented');
  }

  public removeCompletedTodos(): Observable<Todo[]> {
    throw Error('not implemented');
  }

  public markTodoAsCompleted(id: string, isCompleted: boolean): Observable<Todo> {
    throw Error('not implemented');
  }
}
