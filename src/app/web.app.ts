
import { TodoPresenter } from "../todo/presentation/todo.presenter";
import { GetAllTodosUseCase } from "../todo/domain/usecase/get-all-todos.usecase";
import { TodoRepository } from "../todo/domain/repository/todo.repository";
import { TodoInMemoryRepository } from "../todo/data/repository/inmemory/todo.inmemory.repository";
import { TodoRestfulRepository } from "../todo/data/repository/restful/todo.restful.repository";
import { SearchTodosUseCase } from "../todo/domain/usecase/search-todos.usecase";
import { AddTodoUseCase } from "../todo/domain/usecase/add-todo.usecase";

export class WebApp {
  run() {
    const memoryRepo: TodoRepository = new TodoInMemoryRepository();
    const restfulRepo: TodoRepository = new TodoRestfulRepository();
    const getAllTodosUC: GetAllTodosUseCase = new GetAllTodosUseCase(memoryRepo);
    const searchTodosUC: SearchTodosUseCase = new SearchTodosUseCase(memoryRepo);
    const addTodoUC: AddTodoUseCase = new AddTodoUseCase(memoryRepo);

    const presenter: TodoPresenter = new TodoPresenter(
      getAllTodosUC,
      searchTodosUC,
      addTodoUC
    );

    presenter.todos$.subscribe(todos => {
      let resultEl: any = document.getElementById('result');
      resultEl.innerHTML = 'test';
    });

    presenter.getAllTodos();
    presenter.onDestroy();
  }
}

alert('test')