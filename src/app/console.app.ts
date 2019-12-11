import { TodoPresenter } from "../todo/presentation/todo.presenter";
import { GetAllTodosUseCase } from "../todo/domain/usecase/get-all-todos.usecase";
import { TodoRepository } from "../todo/domain/repository/todo.repository";
import { TodoInMemoryRepository } from "../todo/data/repository/inmemory/todo.inmemory.repository";
import { TodoRestfulRepository } from "../todo/data/repository/restful/todo.restful.repository";
import { SearchTodosUseCase } from "../todo/domain/usecase/search-todos.usecase";

export class ConsoleApp {
  presenter: TodoPresenter;

  constructor() {
    const memoryRepo: TodoRepository = new TodoInMemoryRepository();
    const restfulRepo: TodoRepository = new TodoRestfulRepository();
    const getAllTodosUC: GetAllTodosUseCase = new GetAllTodosUseCase(memoryRepo);
    const searchTodosUC: SearchTodosUseCase = new SearchTodosUseCase(memoryRepo);

    this.presenter = new TodoPresenter(
      getAllTodosUC,
      searchTodosUC
    );

    this.presenter.todos$.subscribe(todos => {
      console.log('todos:', todos);
    });
  }

  run() {
    // this.presenter.getAllTodos();
    this.presenter.searchTodos('2');
    
    this.presenter.onDestroy();
  }
}