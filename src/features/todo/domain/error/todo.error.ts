import { Result } from '../../../../core/domain/common/result';
import { DomainError } from '../../../../core/domain/error/domain.error';

export namespace CreateTodoError {
  export class NameInvalidError extends Result<DomainError> {
    public constructor(name: string) {
      super(false, {
        message: `The name ${name} is invalid.`
      })
    }

    public static create(name: string): NameInvalidError {
      return new NameInvalidError(name);
    }
  }
}