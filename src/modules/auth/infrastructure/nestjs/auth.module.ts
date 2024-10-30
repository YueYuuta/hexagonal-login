import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/modules/user/infrastructure/nestjs/user.module';
import { LoginUseCase } from '../../application/use-case/login-use-case';
import { AuthAdapter } from '../adapters/auth.adapter';
import { BcryptHasher } from '../adapters/haser.adapter';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        signOptions: { expiresIn: '1d' },
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    { provide: 'AuthPort', useClass: AuthAdapter },
    { provide: 'Hasher', useClass: BcryptHasher },
    {
      provide: LoginUseCase,
      useFactory: (AuthPort: AuthAdapter, Hasher: BcryptHasher) =>
        new LoginUseCase(AuthPort, Hasher),
      // scope: Scope.REQUEST,
      inject: ['AuthPort', 'Hasher'],
    },
  ],
})
export class AuthModule {}
