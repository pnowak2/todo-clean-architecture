export class TodoState {
  todos: Array<Todo> = [];
}

export interface Todo {
  id: string;
  name: string;
  completed: boolean;
}