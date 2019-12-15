import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GetAllTodosUseCase } from "../domain/usecase/get-all-todos.usecase";
import { TodoViewModelMapper } from "./todo.mapper";
import { TodoState, Todo } from "./state/todos.state";
import { AddTodoUseCase } from "../domain/usecase/add-todo.usecase";
import { GetCompletedTodosUseCase } from "../domain/usecase/get-completed-todos.usecase";
import { GetIncompletedTodosUseCase } from "../domain/usecase/get-incompleted-todos.usecase";
import { MarkTodoAsCompletedUseCase } from "../domain/usecase/mark-todo-as-complete.usecase";
import { MarkTodoAsIncompletedUseCase } from "../domain/usecase/mark-todo-as-incomplete.usecase";
import { RemoveTodoUseCase } from "../domain/usecase/remove-todo-id.usecase";
import { TodoPresenter } from "./todo.presenter";
import { Presenter } from "../../../core/presentation/presenter";

export class TodoDefaultPresenter extends Presenter implements TodoPresenter {
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
    private markTodoAsCompletedUC: MarkTodoAsCompletedUseCase,
    private markTodoAsIncompletedUC: MarkTodoAsIncompletedUseCase,
    private removeTodoUC: RemoveTodoUseCase
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

  markTodoAsCompleted(id: string) {
    this.markTodoAsCompletedUC
      .execute(id)
      .pipe(
        map(todo => this.mapper.mapFrom(todo)),
      ).subscribe(todos => {
        this.getAllTodos();
      })
  }

  markTodoAsIncompleted(id: string) {
    this.markTodoAsIncompletedUC
      .execute(id)
      .pipe(
        map(todo => this.mapper.mapFrom(todo)),
      ).subscribe(todos => {
        this.getAllTodos();
      })
  }

  removeTodo(id: string) {
    this.removeTodoUC
      .execute(id)
      .pipe(
        map(todo => this.mapper.mapFrom(todo))
      ).subscribe(todo => {
        this.getAllTodos();
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