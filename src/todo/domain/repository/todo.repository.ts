import { Todo } from "../model/todo.model";

export abstract class TodoRepository {
  abstract getAllTodos(): Array<Todo>;
}