import { CreateUserModel } from '../domain/models/create-user.model';
import { UserPort } from '../domain/ports/user.port';
import { CreateUserDto } from './dto/create-user.dto';

export class CreateUseCase {
  constructor(private readonly _userPort: UserPort) {}

  async execute(user: CreateUserDto) {
    const password = await this._userPort.hash(user.password);
    const userSend = new CreateUserModel(
      user.firstName,
      user.lastName,
      user.email,
      password,
      user.role,
      user.isActive,
    );
    return await this._userPort.save(userSend);
  }
}
