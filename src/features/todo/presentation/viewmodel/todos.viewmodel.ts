
export class TodoStateVM {
  filter: 'active' | 'completed' | null = null;
  todos: TodoVM[] = [];
}

export interface TodoVM {
  id: string;
  name: string;
  completed: boolean;
  editing?: boolean; // <-- different as in todo domain entity
}
