import { Todo } from "../domain/model/todo.model";
import { Mapper } from "../../base/mapper";
import { TodoViewModel } from "./todo.viewmodel";

export class TodoViewModelMapper implements Mapper<Todo, TodoViewModel> {
  mapFrom(input: Todo): TodoViewModel {
    return { username: input.name };
  }

  mapTo(input: TodoViewModel): Todo {
    return { id: undefined, name: input.username };
  }
} 