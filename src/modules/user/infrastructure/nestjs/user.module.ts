import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeormUserAdapte } from '../typeorm/adapters/user.adapter';

import { GetUseCase } from '../../application/get-use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/user.entity';
import { CreateUseCase } from '../../application/create-use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    { provide: 'UserPort', useClass: TypeormUserAdapte },
    {
      provide: GetUseCase,
      useFactory: (repository: TypeormUserAdapte) => new GetUseCase(repository),
      // scope: Scope.REQUEST,
      inject: ['UserPort'],
    },

    {
      provide: CreateUseCase,
      useFactory: (repository: TypeormUserAdapte) =>
        new CreateUseCase(repository),
      // scope: Scope.REQUEST,
      inject: ['UserPort'],
    },
  ],
  exports: [GetUseCase, 'UserPort'],
})
export class UserModule {}
