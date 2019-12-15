export class TodoState {
  todos: Todo[] = [];
}

export interface Todo {
  id: string;
  name: string;
  completed: boolean;
}