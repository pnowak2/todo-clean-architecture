export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error: string;

  private value: T;

  private constructor(isSuccess: boolean, error?: string, value?: T) {
    if (isSuccess && error) {
      throw new Error('InvalidOperation: A result cannot be successful and contain an error');
    }

    if (!isSuccess && !error) {
      throw new Error('InvalidOperation: A failing needs to contain an error message');
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this.value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error('Cant retrieve the value from a failed result');
    }

    return this.value;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result(true, null, value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result(false, error);
  }

  public static combine(results: Array<Result<any>>): Result<any> {
    for (const result of results) {
      if (result.isFailure) {
        return result;
      }

      return Result.ok<any>();
    }
  }
}