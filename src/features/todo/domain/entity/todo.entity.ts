import { Entity } from '../../../../core/domain/common/entity';
import { Result } from '../../../../core/domain/common/result';
import { UniqueEntityID } from '../../../../core/domain/common/unique-entity-id';

interface TodoProps {
  id: string;
  name: string;
  completed?: boolean;
}

export class TodoEntity extends Entity<TodoProps> {
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
