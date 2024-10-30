export class CreateUserDto {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role?: string, // Opcional, con valor por defecto 'user'
    public readonly isActive?: boolean, // Opcional, con valor por defecto true
  ) {}

  // Aquí puedes añadir lógica adicional de validación o conversión si es necesario
}
