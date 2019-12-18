import { Observable } from 'rxjs';
import { TodoVM } from '../viewmodel/todos.viewmodel';

export abstract class TodoPresenter {
  abstract todos$: Observable<TodoVM[]>;
  abstract todosCount$: Observable<number>;
  abstract incompletedTodosCount$: Observable<number>;
  abstract filter$: Observable<string>;

  abstract getAllTodos(): void;
  abstract getCompletedTodos(): void;
  abstract getIncompletedTodos(): void;
  abstract addTodo(name: string): void;
  abstract markTodoAsCompleted(id: string): void;
  abstract markTodoAsIncompleted(id: string): void;
  abstract markAllTodosAsCompleted(): void;
  abstract markAllTodosAsIncompleted(): void;
  abstract removeTodo(id: string): void;
  abstract removeCompletedTodos(): void;
}