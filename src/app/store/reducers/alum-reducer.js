import { AlumKeys } from '../actions/action-constants';
import { message } from 'antd';

export const initialAlumState = {
  available: [],
  current: null,
  total: 0
};

/**
 * Manages the SEO Alumni
 * @param {*} state state of the alumni
 * @param {*} action Redux action to perform on the state
 */
export const alumReducer = (state = initialAlumState, action) => {
  switch (action.type) {
    case AlumKeys.SET_ALUMNI: {
      return {
        ...state,
        available: action.alumni,
      };
    }

    case AlumKeys.SET_ALUMNI_COUNT: {
      return {
        ...state,
        total: action.total,
      };
    }

    case AlumKeys.SET_CURRENT_ALUM: {
      return {
        ...state,
        current: action.record,
      };
    }
    case AlumKeys.DELETE_ALUM: {
      const alumToDelete = state.available.find(
        (alum) => alum.email === action.email
      );
      if (alumToDelete) {
        const updatedAvailable = state.available.filter(
          (alum) => alum.email !== alumToDelete.email
        );
        return {
          ...state,
          available: updatedAvailable,
        };
      } else {
        message.error('Cannot find alum to be deleted');
      }
      break;
    }
    default:
      return state;
  }
};
