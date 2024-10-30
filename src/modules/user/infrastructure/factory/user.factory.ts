import { UserModel } from '../../domain/models/user.model';

// user.factory.ts
export class UserFactory {
  public static createFromObject(data: {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    role?: string;
    isActive?: boolean;
  }): UserModel {
    return new UserModel(
      data.firstName,
      data.lastName,
      data.email,
      data.passwordHash,
      data.role || 'user', // Rol por defecto
      data.isActive !== undefined ? data.isActive : true, // Usuario activo por defecto
      data.id,
    );
  }
}
