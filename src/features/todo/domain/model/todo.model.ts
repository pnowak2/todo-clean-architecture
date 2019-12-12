export interface TodoProps {
  id: string
  name?: string
}

export class Todo {
  id: string;
  name: string;

  constructor(params: TodoProps) { 
    Object.assign(this, params);
  }
}