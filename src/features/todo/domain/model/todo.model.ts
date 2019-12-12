export class Todo {
  id: string;
  name: string;
  completed?: boolean;

  constructor(params: Todo) { 
    Object.assign(this, params);
  }
}
