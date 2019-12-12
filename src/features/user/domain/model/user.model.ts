export class User {
  id: string;
  username: string;

  constructor(params: User) { 
    Object.assign(this, params);
  }
}
