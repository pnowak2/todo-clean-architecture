import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Presenter } from '../../../../core/presentation/presenter';
import { AddTodoUseCase } from '../../domain/usecase/add-todo.usecase';
import { GetAllTodosUseCase } from '../../domain/usecase/get-all-todos.usecase';
import { GetCompletedTodosUseCase } from '../../domain/usecase/get-completed-todos.usecase';
import { GetIncompletedTodosUseCase } from '../../domain/usecase/get-incompleted-todos.usecase';
import { MarkAllTodosAsCompletedUseCase } from '../../domain/usecase/mark-all-todos-as-completed.usecase';
import { MarkAllTodosAsIncompletedUseCase } from '../../domain/usecase/mark-all-todos-as-incompleted.usecase';
import { MarkTodoAsCompletedUseCase } from '../../domain/usecase/mark-todo-as-complete.usecase';
import { MarkTodoAsIncompletedUseCase } from '../../domain/usecase/mark-todo-as-incomplete.usecase';
import { RemoveCompletedTodosUseCase } from '../../domain/usecase/remove-completed-todos.usecas';
import { RemoveTodoUseCase } from '../../domain/usecase/remove-todo-id.usecase';
import { TodoViewModelMapper } from '../mapper/todo.mapper';
import { TodoStateVM, TodoVM } from '../viewmodel/todos.viewmodel';
import { TodoPresenter } from './todo.presenter';

export class TodoDefaultPresenter extends Presenter implements TodoPresenter {
  private state = new TodoStateVM();
  private dispatch = new BehaviorSubject<TodoStateVM>(this.state);
  private mapper = new TodoViewModelMapper();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  todos$: Observable<TodoVM[]> = this.dispatch.asObservable().pipe(map(state => state.todos));

  todosCount$: Observable<number> = this.todos$.pipe(map(todos => todos.length));

  incompletedTodosCount$: Observable<number> = this.todos$.pipe(
    map(todos => todos.filter(todo => !todo.completed)),
    map(todos => todos.length),
  );

  filter$: Observable<string> = this.dispatch.asObservable().pipe(map(state => state.filter));

  constructor(
    private getAllTodosUC: GetAllTodosUseCase,
    private getCompletedTodosUC: GetCompletedTodosUseCase,
    private getIncompletedTodosUC: GetIncompletedTodosUseCase,
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

  getAllTodos() {
    this.getAllTodosUC
      .execute()
      .pipe(
        map(todos => todos.map(this.mapper.mapFrom)),
        takeUntil(this.destroy$),
      )
      .subscribe(todos => {
        this.updateTodos(todos);
      });
  }

  getCompletedTodos() {
    this.getCompletedTodosUC
      .execute()
      .pipe(
        map(todos => todos.map(this.mapper.mapFrom)),
        takeUntil(this.destroy$),
      )
      .subscribe(todos => {
        this.updateTodos(todos);
      });
  }

  getIncompletedTodos() {
    this.getIncompletedTodosUC
      .execute()
      .pipe(
        map(todos => todos.map(this.mapper.mapFrom)),
        takeUntil(this.destroy$),
      )
      .subscribe(todos => {
        this.updateTodos(todos);
      });
  }

  addTodo(name: string) {
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
        this.getAllTodos();
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
        this.getAllTodos();
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
        this.getAllTodos();
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
        this.getAllTodos();
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
        this.getAllTodos();
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
        this.getAllTodos();
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
