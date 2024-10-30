import { JwtService } from '@nestjs/jwt';
import { UserAuthModel } from '../../domain/models/user-auth.model';
import { AuthPort } from '../../domain/ports/auth.port';

import { UserAuthFactory } from '../factory/user-auth.factory';
import { GetUseCase } from 'src/modules/user/application/get-use-case';
import { PayloadModel } from '../../domain/models/token-payload.model';
import { Injectable } from '@nestjs/common';
@Injectable()
export class AuthAdapter implements AuthPort {
  constructor(
    private readonly _getUseCase: GetUseCase,
    private readonly jwtService: JwtService,
  ) {}
  async findUserByEmail(email: string): Promise<UserAuthModel | null> {
    console.log('🚀 ~ AuthAdapter ~ findUserByEmail ~ email:', email);
    const user = await this._getUseCase.getByEmail(email);
    console.log('🚀 ~ AuthAdapter ~ findUserByEmail ~ user:', user);
    if (user) {
      return UserAuthFactory.createFromObject(user.toPlainObject());
    } else {
      return null;
    }
  }
  async createToken(payload: PayloadModel): Promise<string> {
    return this.jwtService.sign(payload);
  }
  async findUserById(id: number): Promise<UserAuthModel> {
    const user = await this._getUseCase.getByID(id);
    return UserAuthFactory.createFromObject(user.toPlainObject());
  }
}
