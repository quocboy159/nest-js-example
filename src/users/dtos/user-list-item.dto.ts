import { IsNotEmpty, MaxLength, NotContains, MinLength } from 'class-validator';

export class UserListItemDto {
  public firstName: string;

  public lastName: string;

  public userName: string;

  public isActive: boolean;
}
