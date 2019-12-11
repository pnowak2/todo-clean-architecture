import { TodoPresenter } from "../todo/presentation/todo.presenter";
import { GetAllTodosUseCase } from "../todo/domain/usecase/get-all-todos.usecase";
import { TodoRepository } from "../todo/domain/repository/todo.repository";
import { TodoInMemoryRepository } from "../todo/data/repository/inmemory/todo.inmemory.repository";
import { TodoRestfulRepository } from "../todo/data/repository/restful/todo.restful.repository";
import { SearchTodosUseCase } from "../todo/domain/usecase/search-todos.usecase";
import { AddTodoUseCase } from "../todo/domain/usecase/add-todo.usecase";
import { GetTodoByIdUseCase } from "../todo/domain/usecase/get-todo-by-id.usecase";

export class ConsoleApp {
  presenter: TodoPresenter;

  constructor() {
    const inMemoryRepo: TodoRepository = new TodoInMemoryRepository();
    const restfulRepo: TodoRepository = new TodoRestfulRepository();
    const getAllTodosUC: GetAllTodosUseCase = new GetAllTodosUseCase(inMemoryRepo);
    const searchTodosUC: SearchTodosUseCase = new SearchTodosUseCase(inMemoryRepo);
    const addTodoUC: AddTodoUseCase = new AddTodoUseCase(inMemoryRepo);
    const getTodoByIdUC: GetTodoByIdUseCase = new GetTodoByIdUseCase(inMemoryRepo);

    this.presenter = new TodoPresenter(
      getAllTodosUC,
      searchTodosUC,
      addTodoUC,
      getTodoByIdUC
    );

    this.presenter.todos$.subscribe(todos => {
      console.log('todos:', todos);
    });

    this.presenter.todo$.subscribe(todos => {
      console.log('todo:', todos);
    });

    this.presenter.errorMessage$.subscribe(error => {
      console.log('got error:', error);
    });
  }

  run() {
    this.presenter.addTodo('added 1');
    this.presenter.addTodo('added 2');
    // this.presenter.getAllTodos();
    this.presenter.searchTodos('2');

    this.presenter.getTodo('3');
    
    this.presenter.onDestroy();
  }
}