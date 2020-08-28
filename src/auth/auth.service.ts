import {
  Injectable,
  InternalServerErrorException,
  Scope,
  Inject,
} from '@nestjs/common';

import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/services/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async validateOAuthLogin(profile: any, provider: string): Promise<string> {
    try {
      // You can add some registration logic here,
      // to register the user using their thirdPartyId (in this case their googleId)
      const email = profile.emails[0].value;
      const verified = profile.emails[0].verified;
      const user = await this.usersService.findOneByEmail(email);

      if (!user) {
        const createUserDto = new CreateUserDto();
        createUserDto.email = email;
        createUserDto.firstName = profile.name.familyName;
        createUserDto.lastName = profile.name.givenName;
        createUserDto.isActive = verified;
        createUserDto.provider = provider;
        user.id = await this.usersService.create(createUserDto);
      }

      const payload = {
        id: user.id,
        email,
        provider,
        firstName: profile.name.familyName,
        lastName: profile.name.givenName,
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
