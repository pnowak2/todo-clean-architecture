import { GetAllTodosUseCase } from "../domain/usecase/get-all-todos.usecase";
import { Subject } from "rxjs";
import { takeUntil, map } from "rxjs/operators";
import { SearchTodosUseCase } from "../domain/usecase/search-todos.usecase";
import { AddTodoUseCase } from "../domain/usecase/add-todo.usecase";
import { TodoViewModelMapper } from "./todo.mapper";
import { TodoViewModel } from "./todo.viewmodel";
import { GetTodoByIdUseCase } from "../domain/usecase/get-todo-by-id.usecase";

export class TodoPresenter {
  todos$: Subject<Array<TodoViewModel>> = new Subject<Array<TodoViewModel>>();
  todo$: Subject<TodoViewModel> = new Subject<TodoViewModel>();
  destroy$: Subject<any> = new Subject<any>();
  mapper = new TodoViewModelMapper();

  constructor(
    private getAllTodosUC: GetAllTodosUseCase,
    private searchTodosUC: SearchTodosUseCase,
    private addTodoUC: AddTodoUseCase,
    private getTodoByIdUC: GetTodoByIdUseCase
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

  getTodo(id: string) {
    this.getTodoByIdUC
      .execute(id)
      .pipe(
        map(this.mapper.mapFrom),
        takeUntil(this.destroy$)
      )
      .subscribe(this.todo$);
  }

  onDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}