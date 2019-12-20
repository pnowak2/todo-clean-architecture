import { TodoEntity } from './todo.entity';

describe('Todo Entity', () => {
  it('should be properly initialized', () => {
    const todoOrError = TodoEntity.create({
      id: '1',
      name: 'foo',
      completed: true,
    });

    expect(todoOrError.isSuccess).toBe(true);

    expect(todoOrError.getValue().id).toEqual('1');
    expect(todoOrError.getValue().name).toEqual('foo');
    expect(todoOrError.getValue().completed).toEqual(true);
  });

  it('should return error if is invalid', () => {
    const todoOrError = TodoEntity.create({
      id: '1',
      name: '',
      completed: true,
    });

    expect(todoOrError.isFailure).toBe(true);
    expect(todoOrError.error).toEqual('Name cannot be empty');
  });
});
