import { Todo } from "../../../domain/model/todo.model";
import { Mapper } from "../../../../base/mapper";

export class TodoRestfulRepositoryMapper implements Mapper<string, Todo> {
  mapFrom(input: any): Todo {
    return { id: '1', name: input };
  }

  mapTo(input: Todo): string {
    return input.name;
  }
} 