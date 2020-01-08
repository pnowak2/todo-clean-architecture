import { TodoEntity } from './todo.entity';

describe('Todo Entity', () => {
  it('should be properly initialized', () => {
    const todo = TodoEntity.create({
      name: 'test'
    });

    expect(todo.isSuccess).toBe(true);
  });
});
