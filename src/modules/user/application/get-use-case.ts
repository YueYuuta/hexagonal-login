import { UserModel } from '../domain/models/user.model';
import { UserPort } from '../domain/ports/user.port';
import { NotFoundUserException } from './exceptions/not-found.exception';

export class GetUseCase {
  constructor(private readonly _userPort: UserPort) {}

  async getByID(id: number): Promise<UserModel> {
    const user = await this._userPort.findById(id);
    if (!user) {
      throw new NotFoundUserException();
    }
    return user;
  }
  async getByEmail(email: string): Promise<UserModel> {
    const user = await this._userPort.findByEmail(email);
    if (!user) {
      throw new NotFoundUserException();
    }
    return user;
  }
}
