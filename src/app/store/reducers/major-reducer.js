import { MajorKeys } from '../actions/action-constants';
import { message } from 'antd';

export const initialMajorState = {
  available: [],
  current: null,
  total: 0
};

export const majorReducer = (state = initialMajorState, action) => {
  switch (action.type) {
    case MajorKeys.SET_MAJORS: {
      return {
        ...state,
        available: action.majors,
      };
    }
    case MajorKeys.SET_MAJORS_COUNT: {
      return {
        ...state,
        total: action.total,
      };
    }
    case MajorKeys.DELETE_MAJOR: {
      const majorToDelete = state.available.find(
        (major) => major.code === action.code
      );
      if (majorToDelete) {
        const updatedAvailable = state.available.filter(
          (major) => major.code !== majorToDelete.code
        );
        return {
          ...state,
          available: updatedAvailable,
        };
      } else {
        message.error('Cannot find major to be deleted');
      }
      break;
    }
    case MajorKeys.SET_CURRENT_MAJOR: {
      return {
        ...state,
        current: action.record,
      };
    }
    default:
      return state;
  }
};
