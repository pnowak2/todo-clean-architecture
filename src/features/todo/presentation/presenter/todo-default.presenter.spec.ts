import { skip } from 'rxjs/operators';
import { TodoMockModel } from '../../data/repository/inmemory/model/todo-mock.model';
import { TodoInMemoryRepository } from './../../data/repository/inmemory/todo.inmemory.repository';
import { TodoDefaultPresenter } from './todo-default.presenter';
import { TodoPresenter } from './todo.presenter';

describe('Todo Presenter', () => {
  let todoPresenter: TodoPresenter;

  const item1 = ({ id: '1', title: 'todo 1', completed: true });
  const item2 = ({ id: '2', title: 'todo 2', completed: false });
  const db: TodoMockModel[] = [item1, item2];

  beforeEach(() => {
    todoPresenter = new TodoDefaultPresenter(new TodoInMemoryRepository(db));
  });

  describe('Initial State', () => {
    describe('Todos Observable', () => {
      it('should return empty array of todos', (done) => {
        todoPresenter.todos$.subscribe(todos => {
          expect(todos).toEqual([]);
          done();
        });
      });
    });

    describe('Incompleted Todos Count Observable', () => {
      it('should return zero', (done) => {
        todoPresenter.incompletedTodosCount$.subscribe(count => {
          expect(count).toEqual(0);
          done();
        });
      });
    });

    describe('Filter Observable', () => {
      it('should return "all"', (done) => {
        todoPresenter.filter$.subscribe(filter => {
          expect(filter).toEqual('all');
          done();
        });
      });
    });
  });

  describe('Get All Items', () => {
    describe('Todos Observable', () => {
      it('should return proper todos from repository', (done) => {
        todoPresenter.todos$.pipe(skip(1)).subscribe(todos => {
          expect(todos).toHaveLength(2);

          expect(todos[0].id).toEqual(item1.id);
          expect(todos[0].name).toEqual(item1.title);
          expect(todos[0].completed).toEqual(item1.completed);
          expect(todos[0].editing).toBeFalsy();

          expect(todos[1].id).toEqual(item2.id);
          expect(todos[1].name).toEqual(item2.title);
          expect(todos[1].completed).toEqual(item2.completed);
          expect(todos[1].editing).toBeFalsy();

          done();
        });

        todoPresenter.getAllTodos();
      });
    });

    describe('Incompleted Todos Count Observable', () => {
      it('should return proper counts of todos', (done) => {
        todoPresenter.incompletedTodosCount$.pipe(skip(1)).subscribe(count => {
          expect(count).toEqual(1);
          done();
        });

        todoPresenter.getAllTodos();
      });
    });

    describe('Filter Observable', () => {
      it('should return "all"', (done) => {
        todoPresenter.filter$.pipe(skip(1)).subscribe(filter => {
          expect(filter).toEqual('all');
          done();
        });

        todoPresenter.getAllTodos();
      });
    });
  });
});