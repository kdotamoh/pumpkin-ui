import { ApplicationReviewerKeys } from '../actions/action-constants';

export const initialReviwerState = {
  available: [],
  current: {},
};

export const applicationReviewerReducer = (state = initialReviwerState, action) => {
  switch (action.type) {
    case ApplicationReviewerKeys.SET_APPLICATION_REVIEWERS: {
      return {
        ...state,
        available: action.applicationReviewers,
      };
    }
    case ApplicationReviewerKeys.SET_CURRENT_APPLICATION_REVIEWER: {
      return {
        ...state,
        current: action.record,
      };
    }
    default:
      return state;
  }
};
