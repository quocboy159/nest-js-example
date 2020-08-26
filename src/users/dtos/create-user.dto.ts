import { IsNotEmpty, MaxLength, IsEmail } from 'class-validator';
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
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  public provider: string;

  @ApiProperty()
  public isActive: boolean;
}
