import { CreateUserModel } from '../models/create-user.model';
import { UserModel } from '../models/user.model';

export interface UserPort {
  findByEmail(email: string): Promise<UserModel | null>;
  findById(id: number): Promise<UserModel | null>;
  save(user: CreateUserModel): Promise<UserModel>;
  hash(password: string): Promise<string>;
}
