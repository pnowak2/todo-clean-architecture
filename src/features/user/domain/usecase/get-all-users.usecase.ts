import { UseCase } from "../../../../base/usecase";
import { Observable } from "rxjs";
import { User } from "../model/user.model";
import { UserRepository } from "../repository/user.repository";

export class GetAllUsersUseCase implements UseCase<void, Array<User>> {
  constructor(private userRepository: UserRepository) { }

  execute(): Observable<Array<User>> {
    return this.userRepository.getUsers();
  }
}