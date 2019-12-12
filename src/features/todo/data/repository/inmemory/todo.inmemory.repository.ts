import { TodoRepository } from "../../../domain/repository/todo.repository";
import { Todo } from "../../../domain/model/todo.model";
import { Observable, of } from "rxjs";
import { map, find } from "rxjs/operators";

const todos = [
  new Todo({ id: '1', name: 'todo 1' }),
  new Todo({ id: '2', name: 'todo 2' }),
  new Todo({ id: '3', name: 'todo 3' }),
];

export class TodoInMemoryRepository implements TodoRepository {
  getAllTodos(): Observable<Array<Todo>> {
    return of(todos);
  }

  searchTodos(keyword: string): Observable<Array<Todo>> {
    return this.getAllTodos().pipe(
      map(todos => todos.filter(todo => todo.name.includes(keyword)))
    );
  }

  addTodo(name: string): Observable<Todo> {
    const id = Math.random().toString();
    const todo: Todo = { id, name };

    todos.push(todo);
    return of(todo);
  }

  getTodoById(id: string): Observable<Todo> {
    return of(todos.find(todo => todo.id === id));
  }

  removeTodo(id: string): Observable<Todo> {
    const idx = todos.findIndex(todo => todo.id === id);
    const todo = todos.find(todo => todo.id === id);

    todos.splice(idx ,1);

    return of(todo);
  }

  markTodoAsCompleted(id: string, isCompleted: boolean): Observable<Todo> {
    const todo = todos.find(todo => todo.id === id);
    todo.completed = isCompleted;

    return of(todo);
  }
}