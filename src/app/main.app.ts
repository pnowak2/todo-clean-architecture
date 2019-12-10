import { TodoPresenter } from "../todo/presentation/todo.presenter";
import { GetAllTodosUseCase } from "../todo/domain/usecase/get-all-todos.usecase";
import { TodoRepository } from "../todo/domain/repository/todo.repository";
import { TodoInMemoryRepository } from "../todo/data/repository/todo.repository";

export class App {
  run() {
    const repo: TodoRepository = new TodoInMemoryRepository();
    const uc: GetAllTodosUseCase = new GetAllTodosUseCase(repo);
    const presenter: TodoPresenter = new TodoPresenter(uc);

    presenter.todos$.subscribe(todos => {
      console.log('todos:', todos);
    });

    presenter.getAllTodos();
  }
}