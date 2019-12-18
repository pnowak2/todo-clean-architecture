import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoEntity } from '../../../domain/entity/todo.entity';
import { TodoRepository } from '../../../domain/repository/todo.repository';
import { TodoMockMapper } from './mapper/todo-mock.mapper';
import { TodoMockModel } from './model/todo-mock.model';

// Can represent different model in DB/REST than our domain model
let todosDB: TodoMockModel[] = [
  new TodoMockModel({ id: '1', title: 'todo 1', completed: true }),
  new TodoMockModel({ id: '2', title: 'todo 2', completed: false }),
  new TodoMockModel({ id: '3', title: 'todo 3', completed: false }),
];

export class TodoInMemoryRepository implements TodoRepository {
  private mapper = new TodoMockMapper();

  public getAllTodos(): Observable<TodoEntity[]> {
    return of(todosDB)
      .pipe(
        map(mocks => mocks.map(this.mapper.mapTo))
      );
  }

  public getCompletedTodos(): Observable<TodoEntity[]> {
    return of(todosDB.filter(todo => todo.completed))
      .pipe(
        map(mocks => mocks.map(this.mapper.mapTo))
      );
  }

  public getIncompletedTodos(): Observable<TodoEntity[]> {
    return of(todosDB.filter(todo => !todo.completed))
      .pipe(
        map(mocks => mocks.map(this.mapper.mapTo))
      );
  }

  public searchTodos(keyword: string): Observable<TodoEntity[]> {
    return this.getAllTodos()
      .pipe(
        map(todos => todos.filter(todo => todo.name.includes(keyword)))
      );
  }

  public addTodo(name: string): Observable<TodoEntity> {
    const id = 'item-' + new Date().getTime();
    const todo: TodoEntity = { id, name };

    todosDB.push(this.mapper.mapFrom(todo));
    return of(todo);
  }

  public getTodoById(id: string): Observable<TodoEntity> {
    return of(todosDB.find(todo => todo.id === id))
      .pipe(
        map(this.mapper.mapTo)
      )
  }

  public removeTodo(id: string): Observable<TodoEntity> {
    const idx = todosDB.findIndex(t => t.id === id);
    const todo = todosDB.find(t => t.id === id);

    todosDB.splice(idx, 1);

    return of(todo)
      .pipe(
        map(this.mapper.mapTo)
      );
  }

  public removeCompletedTodos(): Observable<TodoEntity[]> {
    const incompletedTodos = todosDB.filter(todo => !todo.completed);
    todosDB = [...incompletedTodos];

    return of(incompletedTodos)
      .pipe(
        map(mocks => mocks.map(this.mapper.mapTo))
      );
  }

  public markTodoAsCompleted(id: string, isCompleted: boolean): Observable<TodoEntity> {
    const todo = todosDB.find(t => t.id === id);
    todo.completed = isCompleted;

    return of(todo)
      .pipe(
        map(this.mapper.mapTo)
      );
  }

  public markAllTodosAsCompleted(): Observable<TodoEntity[]> {
    return of(todosDB.map(todo => ({ ...todo, completed: true })))
      .pipe(
        map(mocks => mocks.map(this.mapper.mapTo))
      );
  }

  public markAllTodosAsIncompleted(): Observable<TodoEntity[]> {
    return of(todosDB.map(todo => ({ ...todo, completed: false })))
      .pipe(
        map(mocks => mocks.map(this.mapper.mapTo))
      );
  }
}
