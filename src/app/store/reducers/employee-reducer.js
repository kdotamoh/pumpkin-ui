import { EmployeeKeys } from '../actions/action-constants';
import { message } from 'antd';

export const initialEmployeeState = {
  available: [],
  current: null,
  total: 0
};

/**
 * Manages the SEO Employees
 * @param {*} state state of the employees
 * @param {*} action Redux action to perform on the state
 */
export const employeeReducer = (state = initialEmployeeState, action) => {
  switch (action.type) {
    case EmployeeKeys.SET_EMPLOYEES: {
      return {
        ...state,
        available: action.employees,
      };
    }
    case EmployeeKeys.SET_EMPLOYEES_COUNT: {
      return {
        ...state,
        total: action.total,
      };
    }
    case EmployeeKeys.SET_CURRENT_EMPLOYEE: {
      return {
        ...state,
        current: action.record,
      };
    }
    // TODO: add employee should happen here too
    case EmployeeKeys.DELETE_EMPLOYEE: {
      const employeeToDelete = state.available.find(
        (employee) => employee.email === action.email
      );
      if (employeeToDelete) {
        const updatedAvailable = state.available.filter(
          (employee) => employee.email !== employeeToDelete.email
        );
        return {
          ...state,
          available: updatedAvailable,
        };
      } else {
        message.error('Cannot find employee to be deleted');
      }
      break;
    }
    default:
      return state;
  }
};
