export class NotFoundUserException extends Error {
  constructor(message?: string) {
    super(message || 'Usurio no encontrado.');
    this.name = 'NotFoundException';
  }
}
