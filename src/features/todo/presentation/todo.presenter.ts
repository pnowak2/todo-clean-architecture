import { GetAllTodosUseCase } from "../domain/usecase/get-all-todos.usecase";
import { Subject, of, empty } from "rxjs";
import { takeUntil, map, catchError } from "rxjs/operators";
import { SearchTodosUseCase } from "../domain/usecase/search-todos.usecase";
import { AddTodoUseCase } from "../domain/usecase/add-todo.usecase";
import { TodoViewModelMapper } from "./todo.mapper";
import { TodoViewModel } from "./todo.viewmodel";
import { GetTodoByIdUseCase } from "../domain/usecase/get-todo-by-id.usecase";
import { RemoveTodoUseCase } from "../domain/usecase/remove-todo-id.usecase";
import { MarkTodoAsCompletedUseCase } from "../domain/usecase/mark-todo-as-complete.usecase";
import { MarkTodoAsIncompletedUseCase } from "../domain/usecase/mark-todo-as-incomplete.usecase";
import { GetCompletedTodosUseCase } from "../domain/usecase/get-completed-todos.usecase";
import { GetIncompletedTodosUseCase } from "../domain/usecase/get-incompleted-todos.usecase";
import { Presenter } from "../../../core/presentation/presenter";

export class TodoPresenter extends Presenter {
  todos$: Subject<Array<TodoViewModel>> = new Subject<Array<TodoViewModel>>();
  todo$: Subject<TodoViewModel> = new Subject<TodoViewModel>();
  errorMessage$: Subject<string> = new Subject<string>();
  destroy$: Subject<any> = new Subject<any>();
  mapper = new TodoViewModelMapper();

  constructor(
    private getAllTodosUC: GetAllTodosUseCase,
    private getCompletedTodosUC: GetCompletedTodosUseCase,
    private getIncompletedTodosUC: GetIncompletedTodosUseCase,
    private searchTodosUC: SearchTodosUseCase,
    private addTodoUC: AddTodoUseCase,
    private getTodoByIdUC: GetTodoByIdUseCase,
    private removeTodoUC: RemoveTodoUseCase,
    private markTodoAsCompletedUC: MarkTodoAsCompletedUseCase,
    private markTodoAsIncompletedUC: MarkTodoAsIncompletedUseCase
  ) {
    super();
  }

  getAllTodos() {
    this.getAllTodosUC
      .execute()
      .pipe(
        map(todos => todos.map(this.mapper.mapFrom)),
        takeUntil(this.destroy$)
      )
      .subscribe(this.todos$);
  }

  getCompletedTodos() {
    this.getCompletedTodosUC
      .execute()
      .pipe(
        map(todos => todos.map(this.mapper.mapFrom)),
        takeUntil(this.destroy$)
      )
      .subscribe(this.todos$);
  }

  getIncompletedTodos() {
    this.getIncompletedTodosUC
      .execute()
      .pipe(
        map(todos => todos.map(this.mapper.mapFrom)),
        takeUntil(this.destroy$)
      )
      .subscribe(this.todos$);
  }

  searchTodos(keyword: string) {
    this.searchTodosUC
      .execute(keyword)
      .pipe(
        map(todos => todos.map(this.mapper.mapFrom)),
        takeUntil(this.destroy$)
      )
      .subscribe(this.todos$);
  }

  addTodo(name: string) {
    this.addTodoUC
      .execute(name)
      .pipe(
        map(this.mapper.mapFrom),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getTodo(id: string) {
    this.getTodoByIdUC
      .execute(id)
      .pipe(
        map(this.mapper.mapFrom),
        takeUntil(this.destroy$),
        catchError(err => {
          this.errorMessage$.next(`Error occured: ${err}`);
          return empty()
        }),
      )
      .subscribe(this.todo$);
  }

  removeTodo(id: string) {
    this.removeTodoUC
      .execute(id)
      .pipe(
        map(this.mapper.mapFrom),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  markTodoAsCompleted(id: string) {
    this.markTodoAsCompletedUC
      .execute(id)
      .pipe(
        map(this.mapper.mapFrom),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  markTodoAsInCompleted(id: string) {
    this.markTodoAsIncompletedUC
      .execute(id)
      .pipe(
        map(this.mapper.mapFrom),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}