import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from '../../application/use-case/login-use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly _loginUseCase: LoginUseCase) {}
  @Post('login')
  async create(@Body() login: { email: string; password: string }) {
    console.log('🚀 ~ AuthController ~ create ~ login:', login);
    return this._loginUseCase.execute(login);
  }
}
