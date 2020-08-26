import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillDto {
  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  public type: number;
}
