export enum SkillLevel {
  NONE = 0,
  BEGINER = 1,
  INTERMEDIATE = 2,
  SENIOR = 3,
}

export const SkillLevelLabels = new Map<number, string>([
  [SkillLevel.NONE, 'None - default'],
  [SkillLevel.BEGINER, 'Beginer'],
  [SkillLevel.INTERMEDIATE, 'Intermediate'],
  [SkillLevel.SENIOR, 'Senior'],
]);
