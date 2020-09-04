export enum UserPermissionRole {
  Employee = 0,
  Admin = 1,
}

export const UserPermissionRoleLabels = new Map<number, string>([
  [UserPermissionRole.Employee, 'Employee'],
  [UserPermissionRole.Admin, 'Admin'],
]);
