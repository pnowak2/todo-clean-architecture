import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TodoMockDto } from '../features/todo/data/repository/inmemory/dto/todo-mock.dto';
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
    this.todoApp.getAllTodos().subscribe(todos => {
      console.log('--- listing todos length ---', todos.length)
    });
    this.todoApp.addTodo('new todo').pipe(
      catchError(err => {
        console.log('--- error occured ---', err);
        return of([]);
      })
    ).subscribe(todo => {
      console.log('--- added todo ---', todo);
    })
  }
}

const db = [
  new TodoMockDto({ id: '1', title: 'todo 1', completed: true }),
  new TodoMockDto({ id: '2', title: 'todo 2', completed: false }),
  new TodoMockDto({ id: '3', title: 'todo 3', completed: false }),
];

new TerminalApp(new TodoInMemoryRepository(db)).run();
