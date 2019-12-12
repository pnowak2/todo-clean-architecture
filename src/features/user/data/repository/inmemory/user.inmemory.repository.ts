
import { Observable, of } from "rxjs";
import { UserRepository } from "../../../domain/repository/user.repository";
import { User } from "../../../domain/model/user.model";

const users: Array<User> = [
  new User({ id: '1', username: 'admin'}),
  new User({ id: '2', username: 'pnowak'})
];

export class UserInMemoryRepository implements UserRepository {
  getUsers(): Observable<Array<User>> {
    return of(users);
  }
}