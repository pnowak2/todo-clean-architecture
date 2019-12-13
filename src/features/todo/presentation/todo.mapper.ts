import { Todo } from "../domain/model/todo.model";
import { Mapper } from "../../../core/domain/model/mapper";
import { TodoViewModel } from "./todo.viewmodel";

export class TodoViewModelMapper implements Mapper<Todo, TodoViewModel> {
  mapFrom(input: Todo): TodoViewModel {
    return { id: input.id, username: input.name, completed: input.completed };
  }

  mapTo(input: TodoViewModel): Todo {
    return { id: input.id, name: input.username, completed: input.completed };
  }
} 