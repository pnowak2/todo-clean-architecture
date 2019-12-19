import { TodoMockModel } from '../features/todo/data/repository/inmemory/model/todo-mock.model';
import { TodoInMemoryRepository } from '../features/todo/data/repository/inmemory/todo.inmemory.repository';
import { TodoRepository } from '../features/todo/domain/repository/todo.repository';
import { TodoDefaultPresenter } from '../features/todo/presentation/presenter/todo-default.presenter';
import { TodoPresenter } from '../features/todo/presentation/presenter/todo.presenter';

export class TerminalApp {
  private todoApp: TodoPresenter = new TodoDefaultPresenter(this.todoRepository);

  constructor(private todoRepository: TodoRepository) {
    this.todoApp.todos$.subscribe(todos => {
      console.log('todos', todos);
    });

    this.todoApp.activeTodosCount$.subscribe(todosCount => {
      console.log('active todos count', todosCount);
    });

    this.todoApp.filter$.subscribe(filter => {
      console.log('filter', filter);
    });
  }

  public run() {
    this.todoApp.getAllTodos();
    this.todoApp.getCompletedTodos();
    this.todoApp.getActiveTodos();

    this.todoApp.addTodo('new todo');
    this.todoApp.addTodo('another new todo');
  }
}

const db = [
  new TodoMockModel({ id: '1', title: 'todo 1', completed: true }),
  new TodoMockModel({ id: '2', title: 'todo 2', completed: false }),
  new TodoMockModel({ id: '3', title: 'todo 3', completed: false }),
];
new TerminalApp(new TodoInMemoryRepository(db)).run();