import { PayloadModel } from '../../domain/models/token-payload.model';
import { UserAuthModel } from '../../domain/models/user-auth.model';
import { AuthPort } from '../../domain/ports/auth.port';
import { Hasher } from '../../domain/ports/hasher.port';
import { loginRequestDto } from '../dto/login-request.dto';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';

export class LoginUseCase {
  constructor(
    private readonly _authPort: AuthPort,
    private readonly _hasherPort: Hasher,
  ) {}
  async execute(loginRequestDto: loginRequestDto): Promise<string> {
    const { email, password } = loginRequestDto;
    //obtener usuario por el email
    const user = await this._authPort.findUserByEmail(email);
    console.log('🚀 ~ LoginUseCase ~ execute ~ user:', user);
    if (!user) {
      throw new InvalidCredentialsException();
    }

    //verificar si el usuario esta activo

    user.isActiveUser();

    //comparar contraseñas
    const validPassword = await this._hasherPort.compare(
      password,
      user.password,
    );
    console.log('🚀 ~ LoginUseCase ~ execute ~ validPassword:', validPassword);
    if (!validPassword) {
      throw new InvalidCredentialsException();
    }
    // const userAuthModel:UserAuthModel = new UserAuthModel(user.)
    // generar token
    const payload: PayloadModel = { id: user.getId() };
    const token = await this._authPort.createToken(payload);

    //TODO: disparar eventos

    // retornar token
    return token;
  }
}
