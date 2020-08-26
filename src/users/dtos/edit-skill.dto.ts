import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditSkillDto {
  public id: number;

  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  @IsNotEmpty()
  public type: number;
}
