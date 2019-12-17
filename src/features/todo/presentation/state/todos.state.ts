
export type FilterTypeVM = 'active' | 'completed' | null;

export class TodoState {
  filter: FilterTypeVM = null;
  todos: TodoVM[] = [];
}

export interface TodoVM {
  id: string;
  name: string;
  completed: boolean;
}
