import { Guard } from '../../../../shared/core/guard';
import { Result } from '../../../../shared/core/Result';
import { Entity } from '../../../../shared/domain/entity';
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id';
import { TodoIdEntity } from './todo-id.entity';

export interface TodoProps {
  name: string;
  completed?: boolean;
}

export class TodoEntity extends Entity<TodoProps> {
  get todoId(): TodoIdEntity {
    return TodoIdEntity.create(this._id).getValue();
  }

  get name() {
    return this.props.name;
  }

  get completed() {
    return this.props.completed;
  }

  private constructor(props: TodoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: TodoProps, id?: UniqueEntityID): Result<TodoEntity> {
    const guardResult = Guard.againstNullOrUndefined(props.name, 'name');

    if(!guardResult.succeeded) {
      return Result.fail(guardResult.message);
    }

    if(props.name.trim() === '') {
      return Result.fail('Name cannot be blank');
    }

    const todo = new TodoEntity({
      ...props
    }, id);

    return Result.ok<TodoEntity>(todo);
  }
}
