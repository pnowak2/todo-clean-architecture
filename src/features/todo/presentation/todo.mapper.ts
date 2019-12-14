import { Todo as TodoModel } from "../domain/model/todo.model";
import { Mapper } from "../../../core/domain/model/mapper";
import { Todo } from "./state/todos.state";

export class TodoViewModelMapper implements Mapper<TodoModel, Todo> {
  mapFrom(input: TodoModel): Todo {
    return { id: input.id, name: input.name, completed: input.completed };
  }

  mapTo(input: Todo): TodoModel {
    return { id: input.id, name: input.name, completed: input.completed };
  }
} 