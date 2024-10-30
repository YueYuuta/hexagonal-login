import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPort } from 'src/modules/user/domain/ports/user.port';
import { UserModel } from 'src/modules/user/domain/models/user.model';
import { UserFactory } from '../../factory/user.factory';
import * as bcrypt from 'bcrypt';
import { CreateUserModel } from 'src/modules/user/domain/models/create-user.model';
@Injectable()
export class TypeormUserAdapte implements UserPort {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
  async save(user: CreateUserModel): Promise<UserModel> {
    const {
      email,
      firstName,
      fullName,
      isActive,
      lastName,
      passwordHash,
      role,
    } = user.toPlainObject();
    const userSave = await this._userRepository.save({
      firstName,
      lastName,
      email,
      passwordHash,
      role: role || 'user',
      isActive: isActive ?? true,
    });
    const userReturn = new UserModel(
      userSave.firstName,
      userSave.lastName,
      userSave.email,
      userSave.passwordHash,
      userSave.role,
      userSave.isActive,
      userSave.id,
    );
    return userReturn;
  }
  async findById(id: number): Promise<UserModel> {
    const user = await this._userRepository.findOne({
      where: { id, deletedAt: null },
    });
    const userModel = UserFactory.createFromObject(user);
    return userModel;
  }
  async findByEmail(email: string): Promise<UserModel | null> {
    const user = await this._userRepository.findOne({
      where: { email, deletedAt: null },
    });

    if (user) {
      return UserFactory.createFromObject(user);
    }
    return null;
  }
}
