import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_KEY') || 'SOME_JWT_KEY',
    });
  }

  async validate(jwtPayload: { sub: number }) {
    const user = await this.userService.checkJwt(jwtPayload.sub);
    if (!user) {
      throw new UnauthorizedException('User is not authorized');
    }
    return user;
  }
}