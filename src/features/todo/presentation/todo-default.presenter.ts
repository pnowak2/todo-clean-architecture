import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Presenter } from '../../../core/presentation/presenter';
import { AddTodoUseCase } from '../domain/usecase/add-todo.usecase';
import { MarkAllTodosAsCompletedUseCase } from '../domain/usecase/mark-all-todos-as-completed.usecase';
import { MarkAllTodosAsIncompletedUseCase } from '../domain/usecase/mark-all-todos-as-incompleted.usecase';
import { MarkTodoAsCompletedUseCase } from '../domain/usecase/mark-todo-as-complete.usecase';
import { MarkTodoAsIncompletedUseCase } from '../domain/usecase/mark-todo-as-incomplete.usecase';
import { RemoveCompletedTodosUseCase } from '../domain/usecase/remove-completed-todos.usecas';
import { RemoveTodoUseCase } from '../domain/usecase/remove-todo-id.usecase';
import { SearchTodosUseCase } from '../domain/usecase/search-todos.usecase';
import { FilterTypeVM, TodoState, TodoVM } from './state/todos.state';
import { TodoViewModelMapper } from './todo.mapper';
import { TodoPresenter } from './todo.presenter';

export class TodoDefaultPresenter extends Presenter implements TodoPresenter {
  private state = new TodoState();
  private dispatch = new BehaviorSubject<TodoState>(this.state);
  private mapper = new TodoViewModelMapper();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  todos$: Observable<TodoVM[]> = this.dispatch.asObservable().pipe(map(state => state.todos));

  todosCount$: Observable<number> = this.todos$.pipe(map(todos => todos.length));

  incompletedTodosCount$: Observable<number> = this.todos$.pipe(
    map(todos => todos.filter(todo => !todo.completed)),
    map(todos => todos.length),
  );

  filter$: Observable<FilterTypeVM> = this.dispatch.asObservable().pipe(map(state => state.filter));

  constructor(
    private searchTodosUC: SearchTodosUseCase,
    private addTodoUC: AddTodoUseCase,
    private markTodoAsCompletedUC: MarkTodoAsCompletedUseCase,
    private markTodoAsIncompletedUC: MarkTodoAsIncompletedUseCase,
    private removeTodoUC: RemoveTodoUseCase,
    private removeCompletedTodosUC: RemoveCompletedTodosUseCase,
    private markAllTodosAsCompletedUC: MarkAllTodosAsCompletedUseCase,
    private markAllTodosAsIncompletedUC: MarkAllTodosAsIncompletedUseCase,
  ) {
    super();
  }

  searchTodos(filterType: FilterTypeVM = null) {
    this.searchTodosUC
      .execute(filterType)
      .pipe(
        map(todos => todos.map(this.mapper.mapFrom)),
        takeUntil(this.destroy$),
      )
      .subscribe(todos => {
        this.updateTodos(todos);
      });
  }

  addTodo() {
    this.addTodoUC
      .execute(name)
      .pipe(
        map(todo => this.mapper.mapFrom(todo)),
        takeUntil(this.destroy$),
      )
      .subscribe(todo => {
        this.updateTodos([...this.state.todos, todo]);
      });
  }

  markTodoAsCompleted(id: string) {
    this.markTodoAsCompletedUC
      .execute(id)
      .pipe(
        map(todo => this.mapper.mapFrom(todo)),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.searchTodos();
      });
  }

  markTodoAsIncompleted(id: string) {
    this.markTodoAsIncompletedUC
      .execute(id)
      .pipe(
        map(todo => this.mapper.mapFrom(todo)),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.searchTodos();
      });
  }

  markAllTodosAsCompleted() {
    this.markAllTodosAsCompletedUC
      .execute()
      .pipe(
        map(todos => todos.map(this.mapper.mapFrom)),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.searchTodos();
      });
  }

  markAllTodosAsIncompleted() {
    this.markAllTodosAsIncompletedUC
      .execute()
      .pipe(
        map(todos => todos.map(this.mapper.mapFrom)),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.searchTodos();
      });
  }

  removeTodo(id: string) {
    this.removeTodoUC
      .execute(id)
      .pipe(
        map(todo => this.mapper.mapFrom(todo)),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.searchTodos();
      });
  }

  removeCompletedTodos() {
    this.removeCompletedTodosUC
      .execute()
      .pipe(
        map(todos => todos.map(this.mapper.mapFrom)),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.searchTodos();
      });
  }

  onDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
