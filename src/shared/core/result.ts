export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean
  public error: T | string;
  private val: T;

  public constructor (isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error('InvalidOperation: A result cannot be successful and contain an error');
    }
    if (!isSuccess && !error) {
      throw new Error('InvalidOperation: A failing result needs to contain an error message');
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this.val = value;
    
    Object.freeze(this);
  }

  public getValue () : T {
    if (!this.isSuccess) {
      throw new Error(`Can't get the value of an error result. Use 'errorValue' instead.`)
    } 

    return this.val;
  }

  public errorValue (): T {
    return this.error as T;
  }

  public static ok<U> (value?: U) : Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U> (error: string): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine (results: Array<Result<any>>) : Result<any> {
    for (const result of results) {
      if (result.isFailure) { return result; }
    }
    return Result.ok();
  }
}
