export enum SkillExperirence {
  SELFTAUGHT = 0,
  COMMERCIAL = 1,
  COMMERCIALEXPERIENCE = 2,
}

export const SkillExperirenceLabels = new Map<number, string>([
  [SkillExperirence.SELFTAUGHT, 'Self-taught'],
  [SkillExperirence.COMMERCIAL, 'Commercial 0-2 years'],
  [SkillExperirence.COMMERCIALEXPERIENCE, 'Commercial experience > 2 years'],
]);
