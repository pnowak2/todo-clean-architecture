import { TodoEntity } from './todo.entity';

test('Todo Model', () => {
  const model = new TodoEntity({
    id: '1',
    name: 'foo',
    completed: true,
  });

  expect(model.id).toEqual('1');
  expect(model.name).toEqual('foo');
  expect(model.completed).toEqual(true);
});
