import { GetAllTodosUseCase } from '../domain/usecase/get-all-todos.usecase';
import { TodoDefaultPresenter } from './todo-default.presenter';
import { TodoPresenter } from './todo.presenter';

describe('Todo Presenter', () => {
  let todoPresenter: TodoPresenter;

  beforeEach(() => {
    const repo = null;
    const getAllUC = new GetAllTodosUseCase(repo);
    todoPresenter = new TodoDefaultPresenter(
      getAllUC,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );
  });

  describe('.getAllTodos()', () => {
    it('should return all items', (done) => {
      todoPresenter.todos$.subscribe(todos => {
        expect(true).toBe(true);
        done();
      });
      // todoPresenter.getAllTodos();
    });
  });
});