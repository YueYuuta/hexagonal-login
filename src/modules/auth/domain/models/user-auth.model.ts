import { UserInactiveException } from '../exceptions/user-incative.exception';

// user.domain.ts
export class UserAuthModel {
  private id: number;
  private firstName: string;
  private lastName: string;
  private email: string;
  private passwordHash: string;
  private role: string;
  private isActive: boolean;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
    role: string = 'user',
    isActive: boolean = true,
    id: number,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;
    this.isActive = isActive;
    if (id) {
      this.id = id;
    }
  }
  // Métodos de dominio

  public getId(): number {
    return this.id;
  }

  public get password() {
    return this.passwordHash;
  }

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public getEmail(): string {
    return this.email;
  }

  public getRole(): string {
    return this.role;
  }

  public isActiveUser(): boolean {
    if (!this.isActive) {
      throw new UserInactiveException();
    }
    return this.isActive;
  }

  public deactivate(): void {
    this.isActive = false;
  }

  public reactivate(): void {
    this.isActive = true;
  }

  public updatePassword(passwordHash: string): void {
    this.passwordHash = passwordHash;
  }

  public updateEmail(email: string): void {
    this.email = email;
  }
}
