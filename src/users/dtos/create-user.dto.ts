import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  @MaxLength(255, { message: "FirstName is too long. Maximal length is $constraint1 characters, but actual is $value"})
  public firstName: string;

  @IsNotEmpty()
  @MaxLength(255, { message: "LastName is too long. Maximal length is $constraint1 characters, but actual is $value"})
  readonly lastName: string;
}