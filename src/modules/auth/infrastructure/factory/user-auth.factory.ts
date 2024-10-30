import { UserAuthModel } from '../../domain/models/user-auth.model';

// user.factory.ts
export class UserAuthFactory {
  public static createFromObject(data: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    role: string;
    isActive: boolean;
  }): UserAuthModel {
    return new UserAuthModel(
      data.firstName,
      data.lastName,
      data.email,
      data.passwordHash,
      data.role,
      data.isActive,
      data.id,
    );
  }
}
