import { ApiProperty } from '@nestjs/swagger';
import { SkillLevel } from '../enums/skill-level.enum';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserSkillDto {
  @ApiProperty()
  @IsNotEmpty()
  public userId: number;

  @ApiProperty()
  @IsNotEmpty()
  public skillId: number;

  @ApiProperty()
  public note: string | undefined;

  @ApiProperty()
  public yearOfExperiences?: number;

  @ApiProperty()
  public level?: SkillLevel | undefined | null;
}
