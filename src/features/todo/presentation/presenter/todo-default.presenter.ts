import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TodoRepository } from '../../domain/repository/todo.repository';
import { AddTodoUseCase } from '../../domain/usecase/add-todo.usecase';
import { FilterTodosUseCase } from '../../domain/usecase/filter-todos.usecase';
import { GetAllTodosUseCase } from '../../domain/usecase/get-all-todos.usecase';
import { GetCompletedTodosUseCase } from '../../domain/usecase/get-completed-todos.usecase';
import { GetIncompletedTodosCountUseCase } from '../../domain/usecase/get-incompleted-todos-count.usecase';
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

export class TodoDefaultPresenter implements TodoPresenter {
  todos$: Observable<TodoVM[]>;
  incompletedTodosCount$: Observable<number>;
  filter$: Observable<string>;

  // internal state
  private state = new TodoStateVM();
  private dispatch = new BehaviorSubject<TodoStateVM>(this.state);
  private mapper = new TodoViewModelMapper();

  // use cases
  private filterTodosUC: FilterTodosUseCase;
  private getAllTodosUC: GetAllTodosUseCase;
  private getCompletedTodosUC: GetCompletedTodosUseCase;
  private getIncompletedTodosUC: GetIncompletedTodosUseCase;
  private getIncompletedTodosCountUC: GetIncompletedTodosCountUseCase;
  private addTodoUC: AddTodoUseCase;
  private markTodoAsCompletedUC: MarkTodoAsCompletedUseCase;
  private markTodoAsIncompletedUC: MarkTodoAsIncompletedUseCase;
  private removeTodoUC: RemoveTodoUseCase;
  private removeCompletedTodosUC: RemoveCompletedTodosUseCase;
  private markAllTodosAsCompletedUC: MarkAllTodosAsCompletedUseCase;
  private markAllTodosAsIncompletedUC: MarkAllTodosAsIncompletedUseCase;

  constructor(private repository: TodoRepository) {
    this.filterTodosUC = new FilterTodosUseCase(this.repository);
    this.getAllTodosUC = new GetAllTodosUseCase(this.repository);
    this.getCompletedTodosUC = new GetCompletedTodosUseCase(this.repository);
    this.getIncompletedTodosUC = new GetIncompletedTodosUseCase(this.repository);
    this.getIncompletedTodosCountUC = new GetIncompletedTodosCountUseCase(this.repository);
    this.addTodoUC = new AddTodoUseCase(this.repository);
    this.markTodoAsCompletedUC = new MarkTodoAsCompletedUseCase(this.repository);
    this.markTodoAsIncompletedUC = new MarkTodoAsIncompletedUseCase(this.repository);
    this.markAllTodosAsCompletedUC = new MarkAllTodosAsCompletedUseCase(this.repository);
    this.markAllTodosAsIncompletedUC = new MarkAllTodosAsIncompletedUseCase(this.repository);
    this.removeTodoUC = new RemoveTodoUseCase(this.repository);
    this.removeCompletedTodosUC = new RemoveCompletedTodosUseCase(this.repository);

    // state selectors
    this.todos$ = this.dispatch.asObservable().pipe(map(state => state.todos));
    this.filter$ = this.dispatch.asObservable().pipe(map(state => state.filter));
    this.incompletedTodosCount$ = this.dispatch.asObservable().pipe(map(state => state.incompletedTodosCount));
  }

  getAllTodos() {
    const todos$ = this.getAllTodosUC.execute();
    const count$ = this.getIncompletedTodosCountUC.execute();

    forkJoin(todos$, count$).subscribe(([todos, count]) => {
      this.dispatch.next(
        (this.state = {
          ...this.state,
          todos: todos.map(this.mapper.mapFrom),
          filter: 'all',
          incompletedTodosCount: count,
        })
      )
    });
  }

  getCompletedTodos() {
    const todos$ = this.getCompletedTodosUC.execute();
    const count$ = this.getIncompletedTodosCountUC.execute();

    forkJoin(todos$, count$).subscribe(([todos, count]) => {
      this.dispatch.next(
        (this.state = {
          ...this.state,
          todos: todos.map(this.mapper.mapFrom),
          filter: 'completed',
          incompletedTodosCount: count,
        })
      )
    });
  }

  getIncompletedTodos() {
    const todos$ = this.getIncompletedTodosUC.execute();
    const count$ = this.getIncompletedTodosCountUC.execute();

    forkJoin(todos$, count$).subscribe(([todos, count]) => {
      this.dispatch.next(
        (this.state = {
          ...this.state,
          todos: todos.map(this.mapper.mapFrom),
          filter: 'active',
          incompletedTodosCount: count,
        })
      )
    });
  }

  addTodo(name: string) {
    const add$ = this.addTodoUC.execute(name);
    const count$ = this.getIncompletedTodosCountUC.execute();
    const todos$ = this.filterTodosUC.execute(this.state.filter);

    forkJoin(add$, count$, todos$).subscribe(([, count, todos]) => {
        this.dispatch.next(
          (this.state = {
            ...this.state,
            todos: todos.map(this.mapper.mapFrom),
            incompletedTodosCount: count
          })
        )
    });
  }

  markTodoAsCompleted(id: string) {
    this.markTodoAsCompletedUC.execute(id)
      .pipe(
        switchMap(() => this.filterTodosUC.execute(this.state.filter))
      ).subscribe(todos => {
        this.dispatch.next(
          (this.state = {
            ...this.state,
            todos: todos.map(this.mapper.mapFrom)
          })
        )
      })
  }

  markTodoAsIncompleted(id: string) {
    this.markTodoAsIncompletedUC.execute(id)
      .pipe(
        switchMap(() => this.filterTodosUC.execute(this.state.filter))
      ).subscribe(todos => {
        this.dispatch.next(
          (this.state = {
            ...this.state,
            todos: todos.map(this.mapper.mapFrom)
          })
        )
      })
  }

  markAllTodosAsCompleted() {
    this.markAllTodosAsCompletedUC.execute()
      .pipe(
        switchMap(() => this.filterTodosUC.execute(this.state.filter))
      ).subscribe(todos => {
        this.dispatch.next(
          (this.state = {
            ...this.state,
            todos: todos.map(this.mapper.mapFrom)
          })
        )
      })
  }

  markAllTodosAsIncompleted() {
    this.markAllTodosAsIncompletedUC.execute()
      .pipe(
        switchMap(() => this.filterTodosUC.execute(this.state.filter))
      ).subscribe(todos => {
        this.dispatch.next(
          (this.state = {
            ...this.state,
            todos: todos.map(this.mapper.mapFrom)
          })
        )
      })
  }

  removeTodo(id: string) {
    this.removeTodoUC.execute(id)
      .pipe(
        switchMap(() => this.filterTodosUC.execute(this.state.filter))
      ).subscribe(todos => {
        this.dispatch.next(
          (this.state = {
            ...this.state,
            todos: todos.map(this.mapper.mapFrom)
          })
        )
      })
  }

  removeCompletedTodos() {
    this.removeCompletedTodosUC.execute()
      .pipe(
        switchMap(() => this.filterTodosUC.execute(this.state.filter))
      ).subscribe(todos => {
        this.dispatch.next(
          (this.state = {
            ...this.state,
            todos: todos.map(this.mapper.mapFrom)
          })
        )
      })
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
