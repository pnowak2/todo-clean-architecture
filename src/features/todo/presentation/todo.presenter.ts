import { Observable } from 'rxjs';
import { FilterTypeVM, TodoVM } from './state/todos.state';

export abstract class TodoPresenter {
  abstract todos$: Observable<TodoVM[]>;
  abstract todosCount$: Observable<number>;
  abstract incompletedTodosCount$: Observable<number>;
  abstract filter$: Observable<FilterTypeVM>;

  abstract searchTodos(filterType: FilterTypeVM): void;
  abstract addTodo(name: string): void;
  abstract markTodoAsCompleted(id: string): void;
  abstract markTodoAsIncompleted(id: string): void;
  abstract markAllTodosAsCompleted(): void;
  abstract markAllTodosAsIncompleted(): void;
  abstract removeTodo(id: string): void;
  abstract removeCompletedTodos(): void;
}
