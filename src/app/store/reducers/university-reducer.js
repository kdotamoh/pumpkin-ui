import { UniversityKeys } from '../actions/action-constants';

export const initialUniversityState = {
  availableUniversities: [],
  availableUniversityMajors: [],
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
        availableUniversities: action.universities,
      };
    }
    case UniversityKeys.SET_UNIVERSITY_MAJORS: {
      return {
        ...state,
        availableUniversityMajors: action.universityMajors,
      };
    }
    default:
      return state;
  }
};
