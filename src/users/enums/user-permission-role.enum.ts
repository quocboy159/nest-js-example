export enum UserPermissionRole {
  Normal = 0,
  Admin = 1,
}

export const UserPermissionRoleLabels = new Map<number, string>([
  [UserPermissionRole.Normal, 'Normal'],
  [UserPermissionRole.Admin, 'Admin'],
]);
