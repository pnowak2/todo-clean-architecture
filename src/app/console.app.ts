import { TodoPresenter } from "../todo/presentation/todo.presenter";
import { GetAllTodosUseCase } from "../todo/domain/usecase/get-all-todos.usecase";
import { TodoRepository } from "../todo/domain/repository/todo.repository";
import { TodoInMemoryRepository } from "../todo/data/repository/inmemory/todo.inmemory.repository";
import { TodoRestfulRepository } from "../todo/data/repository/restful/todo.restful.repository";
import { SearchTodosUseCase } from "../todo/domain/usecase/search-todos.usecase";

export class ConsoleApp {
  run() {
    const memoryRepo: TodoRepository = new TodoInMemoryRepository();
    const restfulRepo: TodoRepository = new TodoRestfulRepository();
    const getAllTodosUC: GetAllTodosUseCase = new GetAllTodosUseCase(memoryRepo);
    const searchTodosUC: SearchTodosUseCase = new SearchTodosUseCase(memoryRepo);
    const presenter: TodoPresenter = new TodoPresenter(
      getAllTodosUC,
      searchTodosUC
    );

    presenter.todos$.subscribe(todos => {
      console.log('todos:', todos);
    });

    presenter.getAllTodos();
    presenter.searchTodos('2');
    // presenter.onDestroy();
  }
}