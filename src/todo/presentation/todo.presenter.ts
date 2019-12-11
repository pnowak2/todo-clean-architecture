import { GetAllTodosUseCase } from "../domain/usecase/get-all-todos.usecase";
import { Subject } from "rxjs";
import { takeUntil, map } from "rxjs/operators";
import { SearchTodosUseCase } from "../domain/usecase/search-todos.usecase";
import { AddTodoUseCase } from "../domain/usecase/add-todo.usecase";
import { TodoViewModelMapper } from "./todo.mapper";
import { TodoViewModel } from "./todo.viewmodel";

export class TodoPresenter {
  todos$: Subject<Array<TodoViewModel>> = new Subject<Array<TodoViewModel>>();
  destroy$: Subject<any> = new Subject<any>();
  mapper = new TodoViewModelMapper();

  constructor(
    private getAllTodosUC: GetAllTodosUseCase,
    private searchTodosUC: SearchTodosUseCase,
    private addTodoUC: AddTodoUseCase
  ) { }

  getAllTodos() {
    this.getAllTodosUC
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

  onDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}