import { IsNotEmpty, MaxLength, NotContains, MinLength } from 'class-validator';

export class UserDto {
  public firstName: string;

  public lastName: string;

  public userName: string;

  public isActive: boolean;

  public skills: string[];
}
