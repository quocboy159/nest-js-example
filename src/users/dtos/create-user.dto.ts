import { IsNotEmpty, MaxLength, NotContains, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(255, {
    message:
      'FirstName is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  public firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255, {
    message:
      'LastName is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  public lastName: string;

  @ApiProperty()
  @NotContains(' ')
  @IsNotEmpty()
  @MaxLength(20, {
    message:
      'FirstName is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  public userName: string;

  @ApiProperty()
  @NotContains(' ')
  @IsNotEmpty()
  @MinLength(6, {
    message:
      'FirstName is too short. Min length is $constraint1 characters, but actual is $value',
  })
  public password: string;

  @ApiProperty()
  public isActive: boolean;
}
