import { Result } from '../../../../shared/core/Result';
import { TodoEntity } from './todo.entity';

describe('Todo Entity', () => {
  describe('Valid', () => {
    let todo: Result<TodoEntity>;

    beforeEach(() => {
      todo = TodoEntity.create({
        name: 'foo'
      });
    });

    it('should be created successfuly', () => {
      expect(todo.isSuccess).toBe(true);
    });

    it('should have proper name', () => {
      expect(todo.getValue().name).toEqual('foo');
    });

    it('should not be completed', () => {
      expect(todo.getValue().completed).toBeFalsy();
    });

    it('should have id generated', () => {
      expect(todo.getValue().todoId.id.toString()).toBeDefined();
    });
  });

  describe('Invalid', () => {
    it('should guard against empty name', () => {
      const todo = TodoEntity.create({
        name: ''
      });

      expect(todo.isFailure).toBe(true);
      expect(todo.error).toEqual('Name cannot be blank');
    });

    it('should guard against blank name', () => {
      const todo = TodoEntity.create({
        name: ' '
      });

      expect(todo.isFailure).toBe(true);
      expect(todo.error).toEqual('Name cannot be blank');
    });
  });
});
