export class UserInactiveException extends Error {
  constructor(mensaje?: string) {
    super(mensaje || 'El usuario está inactivo.');
    this.name = 'UserInactiveException';
  }
}
