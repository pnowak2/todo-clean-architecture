
export class TodoState {
  filter: 'active' | 'completed' | null = null;
  todos: TodoVM[] = [];
}

export interface TodoVM {
  id: string;
  name: string;
  completed: boolean;
}
