import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Presenter } from '../../../../core/presentation/presenter';
import { TodoRepository } from '../../domain/repository/todo.repository';
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

export class TodoDefaultPresenter implements TodoPresenter {
  todos$: Observable<TodoVM[]>;
  incompletedTodosCount$: Observable<number>;
  filter$: Observable<string>;

  // internal state
  private state = new TodoStateVM();
  private dispatch = new BehaviorSubject<TodoStateVM>(this.state);
  private mapper = new TodoViewModelMapper();

  // use cases
  private getAllTodosUC: GetAllTodosUseCase;
  private getCompletedTodosUC: GetCompletedTodosUseCase;
  private getIncompletedTodosUC: GetIncompletedTodosUseCase;
  private addTodoUC: AddTodoUseCase;
  private markTodoAsCompletedUC: MarkTodoAsCompletedUseCase;
  private markTodoAsIncompletedUC: MarkTodoAsIncompletedUseCase;
  private removeTodoUC: RemoveTodoUseCase;
  private removeCompletedTodosUC: RemoveCompletedTodosUseCase;
  private markAllTodosAsCompletedUC: MarkAllTodosAsCompletedUseCase;
  private markAllTodosAsIncompletedUC: MarkAllTodosAsIncompletedUseCase;

  constructor(private todoRepository: TodoRepository) {
    this.getAllTodosUC = new GetAllTodosUseCase(this.todoRepository);
    this.getCompletedTodosUC = new GetCompletedTodosUseCase(this.todoRepository);
    this.getIncompletedTodosUC = new GetIncompletedTodosUseCase(this.todoRepository);
    this.addTodoUC = new AddTodoUseCase(this.todoRepository);
    this.markTodoAsCompletedUC = new MarkTodoAsCompletedUseCase(this.todoRepository);
    this.markTodoAsIncompletedUC = new MarkTodoAsIncompletedUseCase(this.todoRepository);
    this.markAllTodosAsCompletedUC = new MarkAllTodosAsCompletedUseCase(this.todoRepository);
    this.markAllTodosAsIncompletedUC = new MarkAllTodosAsIncompletedUseCase(this.todoRepository);
    this.removeTodoUC = new RemoveTodoUseCase(this.todoRepository);
    this.removeCompletedTodosUC = new RemoveCompletedTodosUseCase(this.todoRepository);

    // state selectors
    this.todos$ = this.dispatch.asObservable().pipe(map(state => state.todos));
    this.filter$ = this.dispatch.asObservable().pipe(map(state => state.filter));
    this.incompletedTodosCount$ = this.todos$.pipe(
      map(todos => todos.filter(todo => !todo.completed)),
      map(todos => todos.length),
    );
  }

  getAllTodos() {
    this.getAllTodosUC
      .execute()
      .pipe(
        map(todos => todos.map(this.mapper.mapFrom)),
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
      )
      .subscribe(() => {
        this.getAllTodos();
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
