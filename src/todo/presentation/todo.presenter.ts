import { GetAllTodosUseCase } from "../domain/usecase/get-all-todos.usecase";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Todo } from "../domain/model/todo.model";

export class TodoPresenter {
  todos$: Subject<Array<Todo>> = new Subject<Array<Todo>>();
  destroy$: Subject<any> = new Subject<any>();

  constructor(private getAllTodosUC: GetAllTodosUseCase) { }

  getAllTodos() {
    this.getAllTodosUC
      .execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.todos$);
  }

  onDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}