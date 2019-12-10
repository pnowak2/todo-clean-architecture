import { TodoRepository } from "../../domain/repository/todo.repository";
import { Todo } from "../../domain/model/todo.model";

export class TodoInMemoryRepository implements TodoRepository {
  getAllTodos(): Array<Todo> {
    return [
      { name: 'todo2' }
    ];
  }
}