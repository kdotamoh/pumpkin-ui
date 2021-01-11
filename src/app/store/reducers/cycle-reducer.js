import { CycleKeys } from '../actions/action-constants';
import { message } from 'antd';

export const initialCycleState = {
  available: [],
  current: null,
  hasCyclesBeenLoaded: false
};

export const cycleReducer = (state = initialCycleState, action) => {
  switch (action.type) {
    case CycleKeys.GET_CYCLES: {
      return {
        ...state,
        hasCyclesBeenLoaded: false
      };
    }
    case CycleKeys.SET_CYCLES: {
      return {
        ...state,
        available: action.cycles,
        hasCyclesBeenLoaded: true
      };
    }
    case CycleKeys.DELETE_CYCLE: {
      const cycleToDelete = state.available.find(
        (cycle) => cycle.code === action.code
      );
      if (cycleToDelete) {
        const updatedAvailable = state.available.filter(
          (cycle) => cycle.code !== cycleToDelete.code
        );
        return {
          ...state,
          available: updatedAvailable,
        };
      } else {
        message.error('Cannot find cycle to be deleted');
      }
      break;
    }
    case CycleKeys.SET_CURRENT_CYCLE: {
      return {
        ...state,
        current: action.record,
      };
    }
    default:
      return state;
  }
};
