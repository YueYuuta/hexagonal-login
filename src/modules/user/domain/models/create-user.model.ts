// user.domain.ts
export class CreateUserModel {
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
    id?: number,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;
    this.isActive = isActive;
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

  public toPlainObject() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      role: this.role,
      isActive: this.isActive,
      passwordHash: this.passwordHash,
      fullName: this.getFullName(), // Si deseas incluir el nombre completo también
    };
  }
}
