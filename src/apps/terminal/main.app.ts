import { TodoPresenter } from "../../features/todo/presentation/todo.presenter";
import { TodoDefaultPresenter } from "../../features/todo/presentation/todo-default.presenter";
import { GetAllTodosUseCase } from "../../features/todo/domain/usecase/get-all-todos.usecase";
import { TodoRepository } from "../../features/todo/domain/repository/todo.repository";
import { TodoInMemoryRepository } from "../../features/todo/data/repository/inmemory/todo.inmemory.repository";
import { Observable } from "rxjs";
import { Todo } from "../../features/todo/presentation/state/todos.state";
import { AddTodoUseCase } from "../../features/todo/domain/usecase/add-todo.usecase";
import { GetCompletedTodosUseCase } from "../../features/todo/domain/usecase/get-completed-todos.usecase";
import { GetIncompletedTodosUseCase } from "../../features/todo/domain/usecase/get-incompleted-todos.usecase";
import { MarkTodoAsCompletedUseCase } from "../../features/todo/domain/usecase/mark-todo-as-complete.usecase";
import { MarkTodoAsIncompletedUseCase } from "../../features/todo/domain/usecase/mark-todo-as-incomplete.usecase";
import { RemoveTodoUseCase } from "../../features/todo/domain/usecase/remove-todo-id.usecase";

export class TerminalApp {
  todos$: Observable<Array<Todo>>;
  todosCount$: Observable<number>;
  incompletedTodosCount$: Observable<number>;

  todoPresenter: TodoPresenter;

  constructor() {
    // Dependency injection configuration
    const inMemoryTodoRepo: TodoRepository = new TodoInMemoryRepository();
    const getAllTodosUC: GetAllTodosUseCase = new GetAllTodosUseCase(inMemoryTodoRepo);
    const getCompletedTodosUC: GetCompletedTodosUseCase = new GetCompletedTodosUseCase(inMemoryTodoRepo);
    const getIncompletedTodosUC: GetIncompletedTodosUseCase = new GetIncompletedTodosUseCase(inMemoryTodoRepo);
    const addTodoUC: AddTodoUseCase = new AddTodoUseCase(inMemoryTodoRepo);
    const markTodoAsCompletedUC: MarkTodoAsCompletedUseCase = new MarkTodoAsCompletedUseCase(inMemoryTodoRepo);
    const markTodoAsIncompletedUC: MarkTodoAsIncompletedUseCase = new MarkTodoAsIncompletedUseCase(inMemoryTodoRepo);
    const removeTodoUC: RemoveTodoUseCase = new RemoveTodoUseCase(inMemoryTodoRepo);

    this.todoPresenter = new TodoDefaultPresenter(
      getAllTodosUC,
      getCompletedTodosUC,
      getIncompletedTodosUC,
      addTodoUC,
      markTodoAsCompletedUC,
      markTodoAsIncompletedUC,
      removeTodoUC
    );

    // View observables binding
    this.todos$ = this.todoPresenter.todos$;
    this.todosCount$ = this.todoPresenter.todosCount$;
    this.incompletedTodosCount$ = this.todoPresenter.incompletedTodosCount$;

    // Presenter reactive subscriptions 
    this.todos$.subscribe(todos => {
      console.log('todos', todos);
    });

    this.todosCount$.subscribe(todosCount => {
      console.log('todos count', todosCount);
    });

    this.incompletedTodosCount$.subscribe(todosCount => {
      console.log('incompleted todos count', todosCount);
    });
  }

  run() {
    // UI Events/Code
    this.todoPresenter.getAllTodos();
  }
}