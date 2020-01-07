import { Result } from '../common/result';
import { DomainError } from './domain.error';

export namespace AppError {
  export class UnexpectedError extends Result<DomainError> {
    public constructor(err: any) {
      super(false, {
        message: `An unexpected error occured.`,
        error: err
      })
    }

    public static create(err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }
}