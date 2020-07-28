import { IsNotEmpty, MaxLength, NotContains } from 'class-validator';
import { IsUserAlreadyExist } from '../validators/is-user-already-exist.validator';
import { property } from 'lodash';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(255, {
    message:
      'FirstName is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  public firstName: string;

  @IsNotEmpty()
  @MaxLength(255, {
    message:
      'LastName is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  public lastName: string;

  @NotContains(' ')
  @IsNotEmpty()
  @MaxLength(20, {
    message:
      'FirstName is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  public userName: string;
}
