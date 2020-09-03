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
import { User } from '../users/models/user.model';
import EnumHepler from '../shared/helpers/enum.helper';
import { UserPermissionRoleLabels } from '../users/enums/user-permission-role.enum';

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
      var user: User = await this.usersService.findOneByEmail(email);

      if (!user) {
        const createUserDto = new CreateUserDto();
        createUserDto.email = email;
        createUserDto.firstName = profile.name.familyName;
        createUserDto.lastName = profile.name.givenName;
        createUserDto.isActive = verified;
        createUserDto.provider = provider;

        await this.usersService.create(createUserDto);

        user = await this.usersService.findOneByEmail(email);
      }

      const payload = {
        id: user.id,
        role: EnumHepler.convertEnumToLabel(
          UserPermissionRoleLabels,
          Number(user.role),
        ),
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
