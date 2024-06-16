import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ProviderHash } from '../utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async validatePassword(username: string, password: string) {
    const user = await this.userService.findUserByName(username);
    const isPasswordMatch = await ProviderHash.validateHash(
      password,
      user.password,
    );
    if (user && isPasswordMatch) {
      return user;
    }
    return null;
  }

  auth(user: User) {
    try {
      const payload = { sub: user.id };
      const secret =
        this.configService.get<string>('JWT_KEY') || 'SOME_JWT_KEY';
      return { access_token: this.jwtService.sign(payload, { secret }) };
    } catch (error) {
      throw new InternalServerErrorException('Server error');
    }
  }
}