import { Result } from '../../../../core/domain/common/result';

export class TodoEntity {
  id: string;
  name: string;
  completed?: boolean;

  private constructor(params: TodoEntity) {
    Object.assign(this, params);
  }

  static create(params: TodoEntity): Result<TodoEntity> {
    if (!params.name) {
      return Result.fail<TodoEntity>('Name cannot be empty')
    }

    return Result.ok<TodoEntity>(new TodoEntity(params))
  }
}
