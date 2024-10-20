import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly UserService: UsersService) {}

  @Post('signup')
  async signupUser(@Body() body: any) {
    return await this.UserService.insertUser(body);
  }

  @Post('login')
  async newValidate(@Body() body: any) {
    return await this.UserService.validateUser(body);
  }
}
