import { Result } from '../../../../shared/core/Result';
import { Entity } from '../../../../shared/domain/entity';
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id';

export class TodoIdEntity extends Entity<any> {
    get id(): UniqueEntityID {
        return this._id;
    }

    private constructor(id?: UniqueEntityID) {
        super(null, id);
    }

    public static create(id?: UniqueEntityID): Result<TodoIdEntity> {
        return Result.ok<TodoIdEntity>(new TodoIdEntity(id));
    }
}