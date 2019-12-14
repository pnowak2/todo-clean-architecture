import { TodoPresenter } from "../../features/todo/presentation/todo.presenter";
import { GetAllTodosUseCase } from "../../features/todo/domain/usecase/get-all-todos.usecase";
import { TodoRepository } from "../../features/todo/domain/repository/todo.repository";
import { TodoInMemoryRepository } from "../../features/todo/data/repository/inmemory/todo.inmemory.repository";
import { Observable } from "rxjs";
import { Todo } from "../../features/todo/presentation/state/todos.state";
import { TodoLocalStorageRepository } from "../../features/todo/data/repository/localstorage/todo.localstorage.repository";
import { LocalStorageService } from "../../core/domain/service/localstorage.service";
import { LocalStorageBrowserService } from "../../core/data/service/localstorage-browser.service";
import { AddTodoUseCase } from "../../features/todo/domain/usecase/add-todo.usecase";

export class ConsoleApp {
  todos$: Observable<Array<Todo>>;
  todosCount$: Observable<number>;

  todoPresenter: TodoPresenter;

  constructor() {
    // Dependency injection configuration
    const inMemoryTodoRepo: TodoRepository = new TodoInMemoryRepository();
    const getAllTodosUC: GetAllTodosUseCase = new GetAllTodosUseCase(inMemoryTodoRepo);
    const addTodoUC: AddTodoUseCase = new AddTodoUseCase(inMemoryTodoRepo);
    this.todoPresenter = new TodoPresenter(
      getAllTodosUC,
      addTodoUC
    );

    // View observables binding
    this.todos$ = this.todoPresenter.todos$;
    this.todosCount$ = this.todoPresenter.todosCount$;

    // Presenter reactive subscriptions 
    this.todos$.subscribe(todos => {
      const todosEl = document.querySelector('#todos');
      todosEl.innerHTML = '';

      todos.forEach(todo => {
        const liEl = document.createElement('li');

        const checkboxEl = document.createElement('input');
        checkboxEl.type = 'checkbox';
        checkboxEl.checked = todo.completed;

        const inputEl = document.createElement('input');
        inputEl.id = todo.id;
        inputEl.value = todo.name;

        liEl.appendChild(checkboxEl);
        liEl.appendChild(inputEl);

        todosEl.appendChild(liEl);
      });
    });

    this.todosCount$.subscribe(todosCount => {
      const todosCountEl = document.querySelector('#todosCount');
      todosCountEl.textContent = todosCount + '';
    });
  }

  run() {
    // UI Events/Code

    this.todoPresenter.getAllTodos();

    document.querySelector('#getAllTodos').addEventListener('click', () => {
      this.todoPresenter.getAllTodos();
    });

    document.querySelector('#addTodo').addEventListener('click', () => {
      this.todoPresenter.addTodo('Hello!');
    });
  }
}