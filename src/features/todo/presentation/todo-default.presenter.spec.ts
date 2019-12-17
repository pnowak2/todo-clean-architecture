import { of } from 'rxjs';
import { TodoRepository } from '../domain/repository/todo.repository';
import { GetAllTodosUseCase } from '../domain/usecase/get-all-todos.usecase';
import { TodoDefaultPresenter } from './todo-default.presenter';
import { TodoPresenter } from './todo.presenter';
import { skip } from 'rxjs/operators';

describe('Todo Presenter', () => {
  let todoPresenter: TodoPresenter;

  beforeEach(() => {
    const getAllUC = new GetAllTodosUseCase(null);
    jest.spyOn(getAllUC, 'execute').mockImplementation(() => {
      return of([
        { id: '1', name: 'foo' },
        { id: '2', name: 'bar' },
      ]);
    })

    todoPresenter = new TodoDefaultPresenter(getAllUC, null, null, null, null, null, null, null, null, null);
  });

  describe('🍕, 🍅, 🧀, 🌶️, 🍄', () => {
    it('should initially return empty array', (done) => {
      todoPresenter.todos$.subscribe(todos => {
        expect(todos).toHaveLength(0);
        done();
      });
    });

    it('should return proper items on getting all items', (done) => {
      todoPresenter.todos$.pipe(skip(1)).subscribe(todos => {
        expect(todos).toHaveLength(2);
        done();
      });

      todoPresenter.getAllTodos();
    });
  });
});