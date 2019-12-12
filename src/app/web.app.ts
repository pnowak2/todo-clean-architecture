
import { TodoPresenter } from "../features/todo/presentation/todo.presenter";
import { GetAllTodosUseCase } from "../features/todo/domain/usecase/get-all-todos.usecase";
import { TodoRepository } from "../features/todo/domain/repository/todo.repository";
import { TodoInMemoryRepository } from "../features/todo/data/repository/inmemory/todo.inmemory.repository";
import { TodoRestfulRepository } from "../features/todo/data/repository/restful/todo.restful.repository";
import { SearchTodosUseCase } from "../features/todo/domain/usecase/search-todos.usecase";
import { AddTodoUseCase } from "../features/todo/domain/usecase/add-todo.usecase";
import { GetTodoByIdUseCase } from "../features/todo/domain/usecase/get-todo-by-id.usecase";

export class WebApp {
  run() {
    const inMemoryRepo: TodoRepository = new TodoInMemoryRepository();
    const restfulRepo: TodoRepository = new TodoRestfulRepository();
    const getAllTodosUC: GetAllTodosUseCase = new GetAllTodosUseCase(inMemoryRepo);
    const searchTodosUC: SearchTodosUseCase = new SearchTodosUseCase(inMemoryRepo);
    const addTodoUC: AddTodoUseCase = new AddTodoUseCase(inMemoryRepo);
    const getTodoByIdUC: GetTodoByIdUseCase = new GetTodoByIdUseCase(inMemoryRepo);

    const presenter: TodoPresenter = new TodoPresenter(
      getAllTodosUC,
      searchTodosUC,
      addTodoUC,
      getTodoByIdUC
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