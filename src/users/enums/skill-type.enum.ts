export enum SkillType {
  BA = 0,
  DEV = 1,
  TESTING = 2,
  PM = 3,
  DESGIN = 4,
  GENERAL = 5,
}

export const SkillTypeLabels = new Map<number, string>([
  [SkillType.BA, 'BA Skills'],
  [SkillType.DEV, 'DEV Skills'],
  [SkillType.TESTING, 'Testing Skills'],
  [SkillType.PM, 'PM Skills'],
  [SkillType.DESGIN, 'Design Skills'],
  [SkillType.GENERAL, 'General Skills'],
]);
