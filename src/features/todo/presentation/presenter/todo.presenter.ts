import { Observable } from 'rxjs';
import { TodoVM } from '../viewmodel/todos.viewmodel';

export abstract class TodoPresenter {
  abstract todos$: Observable<TodoVM[]>;
  abstract activeTodosCount$: Observable<number>;
  abstract filter$: Observable<string>;

  abstract getAllTodos(): void;
  abstract getCompletedTodos(): void;
  abstract getActiveTodos(): void;
  abstract addTodo(name: string): Observable<TodoVM>;
  abstract markTodoAsCompleted(id: string): void;
  abstract markTodoAsActive(id: string): void;
  abstract markAllTodosAsCompleted(): void;
  abstract markAllTodosAsActive(): void;
  abstract removeTodo(id: string): void;
  abstract removeCompletedTodos(): void;
}
