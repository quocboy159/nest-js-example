import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { sign } from 'jsonwebtoken';
import { Provider } from './enums/providers.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService /*private readonly usersService: UsersService*/,
  ) {}

  async validateOAuthLogin(
    thirdPartyId: string,
    provider: Provider,
  ): Promise<string> {
    try {
      // You can add some registration logic here,
      // to register the user using their thirdPartyId (in this case their googleId)
      // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);

      // if (!user)
      // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);

      const payload = {
        thirdPartyId,
        provider,
      };

      const jwt: string = sign(
        payload,
        this.configService.get('auth.jwtSecrectKey'),
        {
          expiresIn: 3600,
          algorithm: 'HS256',
        },
      );
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
// source from https://medium.com/@nielsmeima/auth-in-nest-js-and-angular-463525b6e071
