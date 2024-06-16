import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalGuard } from '../guards/local.guard';
import { User } from 'src/user/entities/user.entity'; 
import { CreateUserDto } from 'src/user/dto/create-user.dto';

interface UserRequest extends Request {
  user: User;
}

@Controller()
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(LocalGuard)
  @Post('signin')
  async signin(@Req() req: UserRequest) {
    const { user } = req;
    return this.authService.auth(user);
  }
}