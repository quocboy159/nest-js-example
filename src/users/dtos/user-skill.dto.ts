import { ApiProperty } from '@nestjs/swagger';
import { SkillLevel } from '../enums/skill-level.enum';

export class UserSkillDto {
  @ApiProperty()
  public userId: number | undefined;

  @ApiProperty()
  public skillId: number;

  @ApiProperty()
  public skillName: string;

  @ApiProperty()
  public note: string | undefined;

  @ApiProperty()
  public type: number;

  @ApiProperty()
  public typeText: string;

  @ApiProperty()
  public yearOfExperiences?: number;

  @ApiProperty()
  public yearOfExperiencesText: string;

  @ApiProperty()
  public level?: SkillLevel | undefined;

  @ApiProperty()
  public levelText: string;

  @ApiProperty()
  public isNew: boolean;
}
