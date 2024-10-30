export class InvalidCredentialsException extends Error {
  constructor(message?: string) {
    super(message || 'Email o contraseña incorrectas.');
    this.name = 'InvalidCredentialsException';
  }
}
