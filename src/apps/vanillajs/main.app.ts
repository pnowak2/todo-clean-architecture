import { Observable } from 'rxjs';
import { TodoInMemoryRepository } from '../../features/todo/data/repository/inmemory/todo.inmemory.repository';
import { TodoRepository } from '../../features/todo/domain/repository/todo.repository';
import { AddTodoUseCase } from '../../features/todo/domain/usecase/add-todo.usecase';
import { GetAllTodosUseCase } from '../../features/todo/domain/usecase/get-all-todos.usecase';
import { GetCompletedTodosUseCase } from '../../features/todo/domain/usecase/get-completed-todos.usecase';
import { GetIncompletedTodosUseCase } from '../../features/todo/domain/usecase/get-incompleted-todos.usecase';
import { MarkTodoAsCompletedUseCase } from '../../features/todo/domain/usecase/mark-todo-as-complete.usecase';
import { MarkTodoAsIncompletedUseCase } from '../../features/todo/domain/usecase/mark-todo-as-incomplete.usecase';
import { RemoveTodoUseCase } from '../../features/todo/domain/usecase/remove-todo-id.usecase';
import { Todo } from '../../features/todo/presentation/state/todos.state';
import { TodoDefaultPresenter } from '../../features/todo/presentation/todo-default.presenter';
import { TodoPresenter } from '../../features/todo/presentation/todo.presenter';

export class VanillaJsApp {
  private todos$: Observable<Todo[]>;
  private todosCount$: Observable<number>;
  private incompletedTodosCount$: Observable<number>;

  private todoPresenter: TodoPresenter;

  constructor() {
    // Dependency injection configuration
    const inMemoryTodoRepo: TodoRepository = new TodoInMemoryRepository();
    const getAllTodosUC: GetAllTodosUseCase = new GetAllTodosUseCase(inMemoryTodoRepo);
    const getCompletedTodosUC: GetCompletedTodosUseCase = new GetCompletedTodosUseCase(inMemoryTodoRepo);
    const getIncompletedTodosUC: GetIncompletedTodosUseCase = new GetIncompletedTodosUseCase(inMemoryTodoRepo);
    const addTodoUC: AddTodoUseCase = new AddTodoUseCase(inMemoryTodoRepo);
    const markTodoAsCompletedUC: MarkTodoAsCompletedUseCase = new MarkTodoAsCompletedUseCase(inMemoryTodoRepo);
    const markTodoAsIncompletedUC: MarkTodoAsIncompletedUseCase = new MarkTodoAsIncompletedUseCase(inMemoryTodoRepo);
    const removeTodoUC: RemoveTodoUseCase = new RemoveTodoUseCase(inMemoryTodoRepo);

    this.todoPresenter = new TodoDefaultPresenter(
      getAllTodosUC,
      getCompletedTodosUC,
      getIncompletedTodosUC,
      addTodoUC,
      markTodoAsCompletedUC,
      markTodoAsIncompletedUC,
      removeTodoUC,
    );

    // View observables binding
    this.todos$ = this.todoPresenter.todos$;
    this.todosCount$ = this.todoPresenter.todosCount$;
    this.incompletedTodosCount$ = this.todoPresenter.incompletedTodosCount$;

    // Presenter reactive subscriptions
    this.todos$.subscribe(todos => {
      const todosEl = document.querySelector('#todos');
      todosEl.innerHTML = '';

      todos.forEach(todo => {
        const liEl = document.createElement('li');
        liEl.addEventListener(
          'click',
          this.handleItemClick.bind({
            self: this,
            todo,
          }),
        );

        const checkboxEl = document.createElement('input');
        checkboxEl.type = 'checkbox';
        checkboxEl.dataset.type = 'checkbox';
        checkboxEl.checked = todo.completed;

        const inputEl = document.createElement('input');
        inputEl.dataset.type = 'input';
        inputEl.value = todo.name;

        const removeEl = document.createElement('button');
        removeEl.dataset.type = 'button';
        removeEl.textContent = 'x';

        liEl.appendChild(checkboxEl);
        liEl.appendChild(inputEl);
        liEl.appendChild(removeEl);

        todosEl.appendChild(liEl);
      });
    });

    this.todosCount$.subscribe(todosCount => {
      const todosCountEl = document.querySelector('#todosCount');
      todosCountEl.textContent = todosCount + '';
    });

    this.incompletedTodosCount$.subscribe(todosCount => {
      const todosCountEl = document.querySelector('#incompletedTodosCount');
      todosCountEl.textContent = todosCount + '';
    });
  }

  public run() {
    // UI Events/Code

    this.todoPresenter.getAllTodos();

    document.querySelector('#getAllTodos').addEventListener('click', () => {
      this.todoPresenter.getAllTodos();
    });

    document.querySelector('#getCompletedTodos').addEventListener('click', () => {
      this.todoPresenter.getCompletedTodos();
    });

    document.querySelector('#getIncompletedTodos').addEventListener('click', () => {
      this.todoPresenter.getIncompletedTodos();
    });

    document.querySelector('#addTodo').addEventListener('click', () => {
      const inputEl = document.querySelector('#addTodoInput') as HTMLInputElement;
      this.todoPresenter.addTodo(inputEl.value);

      inputEl.value = '';
    });
  }

  private handleItemClick(this: any, evt: MouseEvent) {
    const targetEl: HTMLElement = evt.target as HTMLElement;
    if (targetEl.dataset.type === 'checkbox') {
      const inputEl: HTMLInputElement = targetEl as HTMLInputElement;
      if (inputEl.checked) {
        this.self.todoPresenter.markTodoAsCompleted(this.todo.id);
      } else {
        this.self.todoPresenter.markTodoAsIncompleted(this.todo.id);
      }
    }

    if (targetEl.dataset.type === 'input') {
      const inputEl: HTMLInputElement = targetEl as HTMLInputElement;
    }

    if (targetEl.dataset.type === 'button') {
      this.self.todoPresenter.removeTodo(this.todo.id);
    }
  }
}
