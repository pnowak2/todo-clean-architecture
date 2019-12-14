import { GetAllTodosUseCase } from "../domain/usecase/get-all-todos.usecase";
import { BehaviorSubject, Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { TodoViewModelMapper } from "./todo.mapper";
import { Presenter } from "../../../core/presentation/presenter";
import { TodoState, Todo } from "./state/todos.state";
import { AddTodoUseCase } from "../domain/usecase/add-todo.usecase";
import { GetCompletedTodosUseCase } from "../domain/usecase/get-completed-todos.usecase";
import { GetIncompletedTodosUseCase } from "../domain/usecase/get-incompleted-todos.usecase";

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

  incompletedTodosCount$: Observable<number> = this.todos$.pipe(
    map(todos => todos.filter(todo => !todo.completed)),
    map(todos => todos.length)
  );

  constructor(
    private getAllTodosUC: GetAllTodosUseCase,
    private getCompletedTodosUC: GetCompletedTodosUseCase,
    private getIncompletedTodosUC: GetIncompletedTodosUseCase,
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
        this.updateTodos(todos);
      });
  }

  getCompletedTodos() {
    this.getCompletedTodosUC
      .execute()
      .pipe(
        map(todos => todos.map(this.mapper.mapFrom)),
      ).subscribe(todos => {
        this.updateTodos(todos);
      });
  }

  getIncompletedTodos() {
    this.getIncompletedTodosUC
      .execute()
      .pipe(
        map(todos => todos.map(this.mapper.mapFrom)),
      ).subscribe(todos => {
        this.updateTodos(todos);
      });
  }

  addTodo(name: string) {
    this.addTodoUC
      .execute(name)
      .pipe(
        map(todo => this.mapper.mapFrom(todo))
      ).subscribe(todo => {
        this.updateTodos([...this.state.todos, todo])
      })
  }

  private updateTodos(todos: Array<Todo>) {
    this.dispatch.next(
      this.state = {
        ...this.state,
        todos
      }
    );
  }
}