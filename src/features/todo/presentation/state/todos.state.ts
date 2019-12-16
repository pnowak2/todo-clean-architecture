export class TodoState {
  todos: TodoVM[] = [];
}

export interface TodoVM {
  id: string;
  name: string;
  completed: boolean;
}
