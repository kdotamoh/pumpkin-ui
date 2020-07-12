import { UniversityKeys } from '../actions/action-constants';
import { message } from 'antd';

export const initialUniversityState = {
  available: [],
  current: null,
};
/**
 * Manages the SEO Approved Universities
 * @param {*} state state of the universities
 * @param {*} action Redux action to perform on the state
 */

export const universityReducer = (state = initialUniversityState, action) => {
  switch (action.type) {
    case UniversityKeys.SET_UNIVERSITIES: {
      return {
        ...state,
        available: action.universities,
      };
    }
    case UniversityKeys.DELETE_UNIVERSITY: {
      const universityToDelete = state.available.find(
        (university) => university.code === action.code
      );
      if (universityToDelete) {
        const updatedAvailable = state.available.filter(
          (university) => university.code !== universityToDelete.code
        );
        return {
          ...state,
          available: updatedAvailable,
        };
      } else {
        message.error('Cannot find university to be deleted');
      }
      break;
    }
    case UniversityKeys.SET_CURRENT_UNIVERSITY: {
      return {
        ...state,
        current: action.record,
      };
    }
    default:
      return state;
  }
};
