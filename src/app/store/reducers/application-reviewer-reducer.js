import { ApplicationReviewerKeys } from '../actions/action-constants';

export const initialReviewerState = {
  available: [],
  current: {},
  hasReviewersBeenLoaded: false,
  cycleReference: '',
  cyclesHaveBeenLoaded: false
};

export const applicationReviewerReducer = (state = initialReviewerState, action) => {
  switch (action.type) {
    case ApplicationReviewerKeys.GET_APPLICATION_REVIEWERS: {
      return {
        ...state,
        hasReviewersBeenLoaded: false
      };
    }
    case ApplicationReviewerKeys.SET_APPLICATION_REVIEWERS: {
      return {
        ...state,
        available: action.applicationReviewers,
        hasReviewersBeenLoaded: true
      };
    }
    case ApplicationReviewerKeys.SET_CURRENT_APPLICATION_REVIEWER: {
      return {
        ...state,
        current: action.record,
      };
    }
    case  ApplicationReviewerKeys.SET_CYCLE_REFERENCE : {
      return {
        ...state,
        cycleReference: action.cycleReference
      }
    }

    case ApplicationReviewerKeys.SET_CYCLES_HAS_BEEN_LOADED: {
      return {
        ...state,
        cyclesHaveBeenLoaded: action.cyclesHaveBeenLoaded
      }
    }


    default:
      return state;
  }
};
