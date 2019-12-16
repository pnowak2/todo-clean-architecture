import { Observable } from 'rxjs';
import { TodoVM } from './state/todos.state';

export abstract class TodoPresenter {
  abstract todos$: Observable<TodoVM[]>;
  abstract todosCount$: Observable<number>;
  abstract incompletedTodosCount$: Observable<number>;

  abstract getAllTodos(): void;
  abstract getCompletedTodos(): void;
  abstract getIncompletedTodos(): void;
  abstract addTodo(name: string): void;
  abstract markTodoAsCompleted(id: string): void;
  abstract markTodoAsIncompleted(id: string): void;
  abstract removeTodo(id: string): void;
  abstract removeCompletedTodos(): void;
}
