import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoRepository } from '../../domain/repository/todo.repository';
import { AddTodoUseCase } from '../../domain/usecase/add-todo.usecase';
import { FilterTodosUseCase } from '../../domain/usecase/filter-todos.usecase';
import { GetActiveTodosCountUseCase } from '../../domain/usecase/get-active-todos-count.usecase';
import { GetActiveTodosUseCase } from '../../domain/usecase/get-active-todos.usecase';
import { GetAllTodosUseCase } from '../../domain/usecase/get-all-todos.usecase';
import { GetCompletedTodosUseCase } from '../../domain/usecase/get-completed-todos.usecase';
import { MarkAllTodosAsActiveUseCase } from '../../domain/usecase/mark-all-todos-as-active.usecase';
import { MarkAllTodosAsCompletedUseCase } from '../../domain/usecase/mark-all-todos-as-completed.usecase';
import { MarkTodoAsActiveUseCase } from '../../domain/usecase/mark-todo-as-active.usecase';
import { MarkTodoAsCompletedUseCase } from '../../domain/usecase/mark-todo-as-completed.usecase';
import { RemoveCompletedTodosUseCase } from '../../domain/usecase/remove-completed-todos.usecas';
import { RemoveTodoUseCase } from '../../domain/usecase/remove-todo-id.usecase';
import { TodoViewModelMapper } from '../mapper/todo.mapper';
import { TodoStateVM, TodoVM } from '../viewmodel/todos.viewmodel';
import { TodoPresenter } from './todo.presenter';

export class TodoDefaultPresenter implements TodoPresenter {
  todos$: Observable<TodoVM[]>;
  activeTodosCount$: Observable<number>;
  filter$: Observable<string>;

  // internal state
  private state = new TodoStateVM();
  private dispatch = new BehaviorSubject<TodoStateVM>(this.state);
  private mapper = new TodoViewModelMapper();

  // use cases
  private filterTodosUC: FilterTodosUseCase;
  private getAllTodosUC: GetAllTodosUseCase;
  private getCompletedTodosUC: GetCompletedTodosUseCase;
  private getActiveTodosUC: GetActiveTodosUseCase;
  private getActiveTodosCountUC: GetActiveTodosCountUseCase;
  private addTodoUC: AddTodoUseCase;
  private markTodoAsCompletedUC: MarkTodoAsCompletedUseCase;
  private markTodoAsActiveUC: MarkTodoAsActiveUseCase;
  private removeTodoUC: RemoveTodoUseCase;
  private removeCompletedTodosUC: RemoveCompletedTodosUseCase;
  private markAllTodosAsCompletedUC: MarkAllTodosAsCompletedUseCase;
  private markAllTodosAsActiveUC: MarkAllTodosAsActiveUseCase;

  constructor(private repository: TodoRepository) {
    this.filterTodosUC = new FilterTodosUseCase(this.repository);
    this.getAllTodosUC = new GetAllTodosUseCase(this.repository);
    this.getCompletedTodosUC = new GetCompletedTodosUseCase(this.repository);
    this.getActiveTodosUC = new GetActiveTodosUseCase(this.repository);
    this.getActiveTodosCountUC = new GetActiveTodosCountUseCase(this.repository);
    this.addTodoUC = new AddTodoUseCase(this.repository);
    this.markTodoAsCompletedUC = new MarkTodoAsCompletedUseCase(this.repository);
    this.markTodoAsActiveUC = new MarkTodoAsActiveUseCase(this.repository);
    this.markAllTodosAsCompletedUC = new MarkAllTodosAsCompletedUseCase(this.repository);
    this.markAllTodosAsActiveUC = new MarkAllTodosAsActiveUseCase(this.repository);
    this.removeTodoUC = new RemoveTodoUseCase(this.repository);
    this.removeCompletedTodosUC = new RemoveCompletedTodosUseCase(this.repository);

    // state selectors
    this.todos$ = this.dispatch.asObservable().pipe(map(state => state.todos));
    this.filter$ = this.dispatch.asObservable().pipe(map(state => state.filter));
    this.activeTodosCount$ = this.dispatch.asObservable().pipe(map(state => state.activeTodosCount));
  }

  getAllTodos(): Observable<TodoVM[]> {
    const todos$ = this.getAllTodosUC.execute();
    const count$ = this.getActiveTodosCountUC.execute();

    forkJoin(todos$, count$).subscribe(([todos, count]) => {
      this.dispatch.next(
        (this.state = {
          ...this.state,
          todos: todos.map(this.mapper.mapFrom),
          filter: 'all',
          activeTodosCount: count,
        }),
      );
    });

    return todos$.pipe(map(todos => todos.map(this.mapper.mapFrom)));
  }

  getCompletedTodos() {
    const todos$ = this.getCompletedTodosUC.execute();
    const count$ = this.getActiveTodosCountUC.execute();

    forkJoin(todos$, count$).subscribe(([todos, count]) => {
      this.dispatch.next(
        (this.state = {
          ...this.state,
          todos: todos.map(this.mapper.mapFrom),
          filter: 'completed',
          activeTodosCount: count,
        }),
      );
    });
  }

  getActiveTodos() {
    const todos$ = this.getActiveTodosUC.execute();
    const count$ = this.getActiveTodosCountUC.execute();

    forkJoin(todos$, count$).subscribe(([todos, count]) => {
      this.dispatch.next(
        (this.state = {
          ...this.state,
          todos: todos.map(this.mapper.mapFrom),
          filter: 'active',
          activeTodosCount: count,
        }),
      );
    });
  }

  addTodo(name: string): Observable<TodoVM> {
    const add$ = this.addTodoUC.execute({ name });
    const count$ = this.getActiveTodosCountUC.execute();
    const todos$ = this.filterTodosUC.execute({ filter: this.state.filter });

    forkJoin(add$, count$, todos$).subscribe(([todo, count, todos]) => {
      this.dispatch.next(
        (this.state = {
          ...this.state,
          todos: todos.map(this.mapper.mapFrom),
          activeTodosCount: count,
        }),
      );
    });

    return add$.pipe(map(todo => this.mapper.mapFrom(todo.getValue())));
  }

  markTodoAsCompleted(id: string) {
    const mark$ = this.markTodoAsCompletedUC.execute({ id });
    const count$ = this.getActiveTodosCountUC.execute();
    const todos$ = this.filterTodosUC.execute({ filter: this.state.filter });

    forkJoin(mark$, count$, todos$).subscribe(([, count, todos]) => {
      this.dispatch.next(
        (this.state = {
          ...this.state,
          todos: todos.map(this.mapper.mapFrom),
          activeTodosCount: count,
        }),
      );
    });
  }

  markTodoAsActive(id: string) {
    const mark$ = this.markTodoAsActiveUC.execute({ id });
    const count$ = this.getActiveTodosCountUC.execute();
    const todos$ = this.filterTodosUC.execute({ filter: this.state.filter });

    forkJoin(mark$, count$, todos$).subscribe(([, count, todos]) => {
      this.dispatch.next(
        (this.state = {
          ...this.state,
          todos: todos.map(this.mapper.mapFrom),
          activeTodosCount: count,
        }),
      );
    });
  }

  markAllTodosAsCompleted() {
    const mark$ = this.markAllTodosAsCompletedUC.execute();
    const count$ = this.getActiveTodosCountUC.execute();
    const todos$ = this.filterTodosUC.execute({ filter: this.state.filter });

    forkJoin(mark$, count$, todos$).subscribe(([, count, todos]) => {
      this.dispatch.next(
        (this.state = {
          ...this.state,
          todos: todos.map(this.mapper.mapFrom),
          activeTodosCount: count,
        }),
      );
    });
  }

  markAllTodosAsActive() {
    const mark$ = this.markAllTodosAsActiveUC.execute();
    const count$ = this.getActiveTodosCountUC.execute();
    const todos$ = this.filterTodosUC.execute({ filter: this.state.filter });

    forkJoin(mark$, count$, todos$).subscribe(([, count, todos]) => {
      this.dispatch.next(
        (this.state = {
          ...this.state,
          todos: todos.map(this.mapper.mapFrom),
          activeTodosCount: count,
        }),
      );
    });
  }

  removeTodo(id: string) {
    const remove$ = this.removeTodoUC.execute({ id });
    const count$ = this.getActiveTodosCountUC.execute();
    const todos$ = this.filterTodosUC.execute({ filter: this.state.filter });

    forkJoin(remove$, count$, todos$).subscribe(([, count, todos]) => {
      this.dispatch.next(
        (this.state = {
          ...this.state,
          todos: todos.map(this.mapper.mapFrom),
          activeTodosCount: count,
        }),
      );
    });
  }

  removeCompletedTodos() {
    const remove$ = this.removeCompletedTodosUC.execute();
    const count$ = this.getActiveTodosCountUC.execute();
    const todos$ = this.filterTodosUC.execute({ filter: this.state.filter });

    forkJoin(remove$, count$, todos$).subscribe(([, count, todos]) => {
      this.dispatch.next(
        (this.state = {
          ...this.state,
          todos: todos.map(this.mapper.mapFrom),
          activeTodosCount: count,
        }),
      );
    });
  }

  private updateTodos(todos: TodoVM[]) {
    this.dispatch.next(
      (this.state = {
        ...this.state,
        todos,
      }),
    );
  }
}
