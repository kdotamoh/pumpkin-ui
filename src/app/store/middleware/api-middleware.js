import { EmployeeKeys, AlumKeys } from '../actions/action-constants';
import * as EmployeeService from 'api/user-management/employee';
import * as AlumService from 'api/user-management/alum';
import { setEmployees, getEmployees } from '../actions/employee-actions';
import { setAlumni, getAlumni } from '../actions/alum-actions';
import { message } from 'antd';

export const appMiddleware = (store) => (next) => async (action) => {
  const result = next(action);
  switch (action.type) {
    case EmployeeKeys.GET_EMPLOYEES:
      try {
        const employees = await EmployeeService.getEmployees();
        const employeeContent = employees.content;
        store.dispatch(setEmployees(employeeContent));
      } catch (err) {
        message.error(`Cannot get employees: ${err}`);
      }
      break;
    case EmployeeKeys.INVITE_EMPLOYEE:
      try {
        await EmployeeService.inviteEmployee(action.email, action.employeeId);
        store.dispatch(getEmployees());
      } catch (err) {
        message.error(`Cannot invite employee: ${err}`);
      }
      break;
    case EmployeeKeys.DELETE_EMPLOYEE:
      try {
        await EmployeeService.deleteEmployee(action.email);
      } catch (err) {
        message.error(`Cannot delete employee: ${err}`);
      }
      break;
    case EmployeeKeys.SEARCH_EMPLOYEES: {
      try {
        const filteredEmployees = await EmployeeService.searchEmployees(
          action.searchKey
        );
        const employeeContent = filteredEmployees.content;
        store.dispatch(setEmployees(employeeContent));
      } catch (err) {
        message.error(`Cannot search employees: ${err}`);
      }
      break;
    }
    case AlumKeys.GET_ALUMNI:
      try {
        const alumni = await AlumService.getAlumni();
        const alumniContent = alumni.content;
        store.dispatch(setAlumni(alumniContent));
      } catch (err) {
        message.error(`Cannot get alumni: ${err}`);
      }
      break;
    case AlumKeys.INVITE_ALUM:
      try {
        await AlumService.inviteAlum(action.email, action.seoGraduationYear);
        store.dispatch(getAlumni());
      } catch (err) {
        message.error(`Cannot invite alum: ${err}`);
      }
      break;
    case AlumKeys.DELETE_ALUM:
      try {
        await AlumService.deleteAlum(action.email);
      } catch (err) {
        message.error(`Cannot delete alum: ${err}`);
      }
      break;
    case AlumKeys.SEARCH_ALUMNI: {
      try {
        const filteredAlumni = await AlumService.searchAlumni(action.searchKey);
        const alumniContent = filteredAlumni.content;
        store.dispatch(setAlumni(alumniContent));
      } catch (err) {
        message.error(`Cannot search alumni: ${err}`);
      }
      break;
    }
    default:
      return {};
  }
  return result;
};
