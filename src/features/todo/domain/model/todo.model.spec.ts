import { Todo } from './todo.model';

test('Todo Model', () => {
  const model = new Todo({
    id: '1',
    name: 'foo',
    completed: true,
  });

  expect(model.id).toEqual('1');
  expect(model.name).toEqual('foo');
  expect(model.completed).toEqual(true);
});
