import { TodoPresenter } from "../todo/presentation/todo.presenter";
import { GetAllTodosUseCase } from "../todo/domain/usecase/get-all-todos.usecase";
import { TodoRepository } from "../todo/domain/repository/todo.repository";
import { TodoInMemoryRepository } from "../todo/data/repository/todo.inmemory.repository";
import { TodoRestfulRepository } from "../todo/data/repository/todo.restful.repository";

export class ConsoleApp {
  run() {
    const memoryRepo: TodoRepository = new TodoInMemoryRepository();
    const restfulRepo: TodoRepository = new TodoRestfulRepository();
    const uc: GetAllTodosUseCase = new GetAllTodosUseCase(memoryRepo);
    const presenter: TodoPresenter = new TodoPresenter(uc);

    presenter.todos$.subscribe(todos => {
      console.log('todos:', todos);
    });

    presenter.getAllTodos();
    presenter.onDestroy();
  }
}