import { GetAllTodosUseCase } from "../domain/usecase/get-all-todos.usecase";
import { BehaviorSubject, Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { TodoViewModelMapper } from "./todo.mapper";
import { Presenter } from "../../../core/presentation/presenter";
import { TodoState, Todo } from "./state/todos.state";
import { AddTodoUseCase } from "../domain/usecase/add-todo.usecase";

export class TodoPresenter extends Presenter {
  private state = new TodoState();
  private dispatch = new BehaviorSubject<TodoState>(this.state);
  private mapper = new TodoViewModelMapper();

  todos$: Observable<Array<Todo>> = this.dispatch
    .asObservable()
    .pipe(
      map(state => state.todos)
    );

  todosCount$: Observable<number> = this.todos$.pipe(
    map(todos => todos.length)
  );

  constructor(
    private getAllTodosUC: GetAllTodosUseCase,
    private addTodoUC: AddTodoUseCase,
  ) {
    super();
  }

  getAllTodos() {
    this.getAllTodosUC
      .execute()
      .pipe(
        map(todos => todos.map(this.mapper.mapFrom)),
      ).subscribe(todos => {
        this.dispatch.next(
          this.state = {
            ...this.state,
            todos
          }
        );
      });
  }

  addTodo(name: string) {
    this.addTodoUC
      .execute(name)
      .pipe(
        map(todo => this.mapper.mapFrom(todo))
      ).subscribe(todo => {
        this.dispatch.next(
          this.state = {
            ...this.state,
            todos: [...this.state.todos, todo]
          }
        );
      })
  }
}