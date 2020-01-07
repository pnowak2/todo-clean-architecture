export class TodoStateVM {
  filter: 'active' | 'completed' | 'all' = 'all';
  todos: TodoVM[] = [];
  activeTodosCount: number = 0;
  error: string;
}

export interface TodoVM {
  id: string;
  name: string;
  completed: boolean;
  editing?: boolean; // <-- different as in todo domain entity
}
