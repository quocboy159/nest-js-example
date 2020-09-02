export enum UserTypes {
  Normal = 0,
  Admin = 1,
}

export const UserTypeLabels = new Map<number, string>([
  [UserTypes.Normal, 'Normal'],
  [UserTypes.Admin, 'Admin'],
]);
