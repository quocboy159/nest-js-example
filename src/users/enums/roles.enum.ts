export enum Roles {
  JuniorDev = 0,
  MiddleDev = 1,
  SeniorDev = 2,
  QC = 3,
  QA = 4,
  PM = 5,
}

export const RoleLabels = new Map<number, string>([
  [Roles.JuniorDev, 'Junior Dev'],
  [Roles.MiddleDev, 'Middle Dev'],
  [Roles.SeniorDev, 'Senior Dev'],
  [Roles.QC, 'QC'],
  [Roles.QA, 'QA'],
  [Roles.PM, 'PM'],
]);
