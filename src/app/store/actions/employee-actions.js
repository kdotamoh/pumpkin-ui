import { EmployeeKeys } from './action-constants';

export const getEmployees = () => ({
  type: EmployeeKeys.GET_EMPLOYEES,
});

export const setEmployees = (employees) => ({
  type: EmployeeKeys.SET_EMPLOYEES,
  employees,
});

export const inviteEmployee = (email, employeeId) => ({
  type: EmployeeKeys.INVITE_EMPLOYEE,
  email,
  employeeId,
});

export const deleteEmployee = (email) => ({
  type: EmployeeKeys.DELETE_EMPLOYEE,
  email,
});

export const searchEmployees = (searchKey) => ({
  type: EmployeeKeys.SEARCH_EMPLOYEES,
  searchKey,
});

export const setCurrentEmployee = (record) => ({
  type: EmployeeKeys.SET_CURRENT_EMPLOYEE,
  record,
});
