import { EmployeeKeys } from './action-constants';

export const getEmployees = (currentPage) => ({
  type: EmployeeKeys.GET_EMPLOYEES,
  currentPage
});

export const setEmployees = (employees) => ({
  type: EmployeeKeys.SET_EMPLOYEES,
  employees,
});

export const setEmployeesCount = (total) => ({
  type: EmployeeKeys.SET_EMPLOYEES_COUNT,
  total,
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
