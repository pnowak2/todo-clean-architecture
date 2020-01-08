import { of } from 'rxjs';
import { TodoEntity } from '../entity/todo.entity';
import { TodoRepository } from '../repository/todo.repository';
import { GetAllTodosUseCase } from './get-all-todos.usecase';
import { GetCompletedTodosUseCase } from './get-completed-todos.usecase';

describe('Get All Todos Use Case', () => {

  const repo: TodoRepository = {
    getAllTodos() {
      return of([
        TodoEntity.create({
          id: '1',
          name: 'one',
          completed: false
        }),
        TodoEntity.create({
          id: '2',
          name: 'two',
          completed: false
        }),
        TodoEntity.create({
          id: '3',
          name: 'three',
          completed: true
        }),
      ]);
    },
    getCompletedTodos() {
      return of([
        TodoEntity.create({
          id: '3',
          name: 'three',
          completed: true
        }),
      ]);
    }
  } as TodoRepository;

  it('get all', (done) => {
    const getAllTodosUC = new GetAllTodosUseCase(repo);

    getAllTodosUC.execute().subscribe(todos => {
      expect(todos).toHaveLength(3);
      done();
    })
  });

  it('get completed', (done) => {
    const getCompletedTodosUC = new GetCompletedTodosUseCase(repo);

    getCompletedTodosUC.execute().subscribe(todos => {
      expect(todos).toHaveLength(1);
      done();
    })
  });
});
