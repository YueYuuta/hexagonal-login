import { PayloadModel } from '../models/token-payload.model';
import { UserAuthModel } from '../models/user-auth.model';

export interface AuthPort {
  findUserById(id: number): Promise<UserAuthModel | null>;
  findUserByEmail(email: string): Promise<UserAuthModel | null>;
  createToken(payload: PayloadModel): Promise<string>;
}
