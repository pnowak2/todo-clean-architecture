import { Mapper } from "../../../core/domain/model/mapper";
import { User } from "../domain/model/user.model";
import { UserViewModel } from "./user.viewmodel";

export class UserViewModelMapper implements Mapper<User, UserViewModel> {
  mapFrom(input: User): UserViewModel {
    return { nickname: input.username };
  }

  mapTo(input: UserViewModel): User {
    return { id: undefined, username: input.nickname };
  }
} 