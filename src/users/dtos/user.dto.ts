import { IsNotEmpty, MaxLength, NotContains, MinLength } from 'class-validator';

export class UserDto {
  public firstName: string;

  public lastName: string;

  public email: string;

  public provider: string;

  public isActive: boolean;

  public skills: string[];
}
