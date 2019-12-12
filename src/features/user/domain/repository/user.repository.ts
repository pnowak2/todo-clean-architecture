
import { Observable } from "rxjs";
import { User } from "../model/user.model";

export abstract class UserRepository {
  abstract getUsers(): Observable<Array<User>>;
}