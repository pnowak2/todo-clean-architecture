export interface UserProps {
  id: string
  username: string
}

export class User {
  id: string;
  username: string;

  constructor(params: UserProps) { 
    Object.assign(this, params);
  }
}
