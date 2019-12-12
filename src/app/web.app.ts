
import { TodoPresenter } from "../features/todo/presentation/todo.presenter";
import { GetAllTodosUseCase } from "../features/todo/domain/usecase/get-all-todos.usecase";
import { TodoRepository } from "../features/todo/domain/repository/todo.repository";
import { TodoInMemoryRepository } from "../features/todo/data/repository/inmemory/todo.inmemory.repository";
import { TodoRestfulRepository } from "../features/todo/data/repository/restful/todo.restful.repository";
import { SearchTodosUseCase } from "../features/todo/domain/usecase/search-todos.usecase";
import { AddTodoUseCase } from "../features/todo/domain/usecase/add-todo.usecase";
import { GetTodoByIdUseCase } from "../features/todo/domain/usecase/get-todo-by-id.usecase";
import { RemoveTodoUseCase } from "../features/todo/domain/usecase/remove-todo-id.usecase";
import { MarkTodoAsCompletedUseCase } from "../features/todo/domain/usecase/mark-todo-as-complete.usecase";
import { MarkTodoAsIncompletedUseCase } from "../features/todo/domain/usecase/mark-todo-as-incomplete.usecase";

export class WebApp {
  run() {
    const restfulRepo: TodoRepository = new TodoRestfulRepository();
    const inMemoryTodoRepo: TodoRepository = new TodoInMemoryRepository();
    const getAllTodosUC: GetAllTodosUseCase = new GetAllTodosUseCase(inMemoryTodoRepo);
    const searchTodosUC: SearchTodosUseCase = new SearchTodosUseCase(inMemoryTodoRepo);
    const addTodoUC: AddTodoUseCase = new AddTodoUseCase(inMemoryTodoRepo);
    const getTodoByIdUC: GetTodoByIdUseCase = new GetTodoByIdUseCase(inMemoryTodoRepo);
    const removeTodoUC: RemoveTodoUseCase = new RemoveTodoUseCase(inMemoryTodoRepo);
    const markTodoAsCompletedUC: MarkTodoAsCompletedUseCase = new MarkTodoAsCompletedUseCase(inMemoryTodoRepo);
    const markTodoAsIncompletedUC: MarkTodoAsIncompletedUseCase = new MarkTodoAsIncompletedUseCase(inMemoryTodoRepo);

    const presenter: TodoPresenter = new TodoPresenter(
      getAllTodosUC,
      searchTodosUC,
      addTodoUC,
      getTodoByIdUC,
      removeTodoUC,
      markTodoAsCompletedUC,
      markTodoAsIncompletedUC
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