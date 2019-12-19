export class TodoEntity {
  id: string;
  name: string;
  completed?: boolean;

  constructor(params: TodoEntity) {
    Object.assign(this, params);
  }
}
