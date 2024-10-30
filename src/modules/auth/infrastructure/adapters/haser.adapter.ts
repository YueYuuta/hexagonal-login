// infrastructure/adapters/bcrypt-hasher.adapter.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Hasher } from '../../domain/ports/hasher.port';

@Injectable()
export class BcryptHasher implements Hasher {
  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
