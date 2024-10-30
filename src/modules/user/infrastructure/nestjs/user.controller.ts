import { Body, Controller, Post } from '@nestjs/common';
import { CreateUseCase } from '../../application/create-use-case';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly _createUserUseCase: CreateUseCase) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this._createUserUseCase.execute(createUserDto);
  }
}
