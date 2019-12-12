import { TodoPresenter } from "../features/todo/presentation/todo.presenter";
import { GetAllTodosUseCase } from "../features/todo/domain/usecase/get-all-todos.usecase";
import { TodoRepository } from "../features/todo/domain/repository/todo.repository";
import { TodoInMemoryRepository } from "../features/todo/data/repository/inmemory/todo.inmemory.repository";
import { TodoRestfulRepository } from "../features/todo/data/repository/restful/todo.restful.repository";
import { SearchTodosUseCase } from "../features/todo/domain/usecase/search-todos.usecase";
import { AddTodoUseCase } from "../features/todo/domain/usecase/add-todo.usecase";
import { GetTodoByIdUseCase } from "../features/todo/domain/usecase/get-todo-by-id.usecase";
import { UserRepository } from "../features/user/domain/repository/user.repository";
import { UserInMemoryRepository } from "../features/user/data/repository/inmemory/user.inmemory.repository";
import { GetAllUsersUseCase } from "../features/user/domain/usecase/get-all-users.usecase";
import { UserPresenter } from "../features/user/presentation/user.presenter";

export class ConsoleApp {
  todoPresenter: TodoPresenter;
  userPresenter: UserPresenter;

  constructor() {
    const inMemoryTodoRepo: TodoRepository = new TodoInMemoryRepository();
    const restfulTodoRepo: TodoRepository = new TodoRestfulRepository();
    const getAllTodosUC: GetAllTodosUseCase = new GetAllTodosUseCase(inMemoryTodoRepo);
    const searchTodosUC: SearchTodosUseCase = new SearchTodosUseCase(inMemoryTodoRepo);
    const addTodoUC: AddTodoUseCase = new AddTodoUseCase(inMemoryTodoRepo);
    const getTodoByIdUC: GetTodoByIdUseCase = new GetTodoByIdUseCase(inMemoryTodoRepo);
    this.todoPresenter = new TodoPresenter(
      getAllTodosUC,
      searchTodosUC,
      addTodoUC,
      getTodoByIdUC
    );

    const inMemoryUserRepo: UserRepository = new UserInMemoryRepository();
    const getAllUsersUC: GetAllUsersUseCase = new GetAllUsersUseCase(inMemoryUserRepo);
    this.userPresenter = new UserPresenter(getAllUsersUC);

    this.todoPresenter.todos$.subscribe(todos => {
      console.log('todos:', todos);
    });

    this.todoPresenter.todo$.subscribe(todos => {
      console.log('todo:', todos);
    });

    this.todoPresenter.errorMessage$.subscribe(error => {
      console.log('got error:', error);
    });

    this.userPresenter.users$.subscribe(users => {
      console.log('users:', users);
    })
  }

  run() {
    this.todoPresenter.addTodo('added 1');
    this.todoPresenter.addTodo('added 2');
    this.todoPresenter.getAllTodos();
    this.todoPresenter.searchTodos('2');
    this.todoPresenter.getTodo('3');
    
    this.userPresenter.getAllUsers();

    this.todoPresenter.onDestroy();
    this.userPresenter.onDestroy();
  }
}