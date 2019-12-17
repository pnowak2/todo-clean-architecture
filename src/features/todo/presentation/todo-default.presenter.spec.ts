import { of } from 'rxjs';
import { skip } from 'rxjs/operators';
import { AddTodoUseCase } from '../domain/usecase/add-todo.usecase';
import { GetAllTodosUseCase } from '../domain/usecase/get-all-todos.usecase';
import { GetCompletedTodosUseCase } from '../domain/usecase/get-completed-todos.usecase';
import { GetIncompletedTodosUseCase } from '../domain/usecase/get-incompleted-todos.usecase';
import { MarkAllTodosAsCompletedUseCase } from '../domain/usecase/mark-all-todos-as-completed.usecase';
import { MarkAllTodosAsIncompletedUseCase } from '../domain/usecase/mark-all-todos-as-incompleted.usecase';
import { MarkTodoAsCompletedUseCase } from '../domain/usecase/mark-todo-as-complete.usecase';
import { MarkTodoAsIncompletedUseCase } from '../domain/usecase/mark-todo-as-incomplete.usecase';
import { RemoveCompletedTodosUseCase } from '../domain/usecase/remove-completed-todos.usecas';
import { RemoveTodoUseCase } from '../domain/usecase/remove-todo-id.usecase';
import { TodoDefaultPresenter } from './todo-default.presenter';
import { TodoPresenter } from './todo.presenter';

describe('Todo Presenter', () => {
  let todoPresenter: TodoPresenter;
  const item1 = { id: '1', name: 'foo' };
  const item2 = { id: '2', name: 'bar' };
  const db = [item1, item2];


    beforeEach(() => {
      const getAllUC = new GetAllTodosUseCase(null);
      const getCompletedUC = new GetCompletedTodosUseCase(null);
      const getIncompletedUC = new GetIncompletedTodosUseCase(null);
      const addTodoUC = new AddTodoUseCase(null);
      const markTodoCompletedUC = new MarkTodoAsCompletedUseCase(null);
      const markTodoIncompletedUC = new MarkTodoAsIncompletedUseCase(null);
      const removeTodoUC = new RemoveTodoUseCase(null);
      const removeCompletedTodosUC = new RemoveCompletedTodosUseCase(null);
      const markAllTodosAsCompletedUC = new MarkAllTodosAsCompletedUseCase(null);
      const markAllTodosAsIncompletedUC = new MarkAllTodosAsIncompletedUseCase(null);

      todoPresenter = new TodoDefaultPresenter(
        getAllUC,
        getCompletedUC,
        getIncompletedUC,
        addTodoUC,
        markTodoCompletedUC,
        markTodoIncompletedUC,
        removeTodoUC,
        removeCompletedTodosUC,
        markAllTodosAsCompletedUC,
        markAllTodosAsIncompletedUC,
      );

      jest.spyOn(getAllUC, 'execute').mockReturnValue(of(db));
    });

  describe('🍕, 🍅, 🧀, 🌶️, 🍄', () => {
    it('should initially return empty array', (done) => {
      todoPresenter.todos$.subscribe(todos => {
        expect(todos).toEqual([]);
        done();
      });
    });

    it('should return proper items on getting all items', (done) => {
      todoPresenter.todos$.pipe(skip(1)).subscribe(todos => {
        expect(todos).toHaveLength(2);
        expect(todos[0]).toEqual(item1);
        expect(todos[1]).toEqual(item2);
        done();
      });

      todoPresenter.getAllTodos();
    });
  });
});