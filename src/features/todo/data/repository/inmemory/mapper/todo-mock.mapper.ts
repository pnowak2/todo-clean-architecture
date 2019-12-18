import { Mapper } from '../../../../../../core/common/mapper';
import { TodoEntity } from '../../../../domain/entity/todo.entity';
import { TodoMockModel } from './../model/todo-mock.model';

export class TodoMockMapper implements Mapper<TodoEntity, TodoMockModel> {
  mapFrom(input: TodoEntity): TodoMockModel {
    return { id: input.id, title: input.name, completed: input.completed };
  }

  mapTo(input: TodoMockModel): TodoEntity {
    return { id: input.id, name: input.title, completed: input.completed };
  }
}
