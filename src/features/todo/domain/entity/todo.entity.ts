import { Entity } from '../../../../core/domain/common/entity';
import { Result } from '../../../../core/domain/common/result';
import { UniqueEntityID } from '../../../../core/domain/common/unique-entity-id';
import { Name } from './name.vo';

interface TodoProps {
  name: Name;
  completed?: boolean;
}

export class TodoEntity extends Entity<TodoProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get name(): Name {
    return this.props.name
  }

  get completed(): boolean {
    return this.props.completed;
  }

  private constructor(props: TodoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: TodoProps): Result<TodoEntity> {
    if (!props.name) {
      return Result.fail<TodoEntity>('Name cannot be empty')
    }

    return Result.ok<TodoEntity>(new TodoEntity(props))
  }
}
