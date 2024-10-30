import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserAuthModel } from '../../domain/models/user-auth.model';
import { AuthPort } from '../../domain/ports/auth.port';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authPort: AuthPort) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'sdasd',
    });
  }

  async validate(payload: { id: number }): Promise<UserAuthModel> {
    const { id } = payload;
    const user = await this._authPort.findUserById(id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
