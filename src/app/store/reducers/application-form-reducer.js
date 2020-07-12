import { ApplicationFormKeys } from '../actions/action-constants';

export const initialApplicationFormState = {
  countries: [],
  genders: [],
  academicStandings: [],
};

/**
 * Manages the Candidate Application Forms
 * @param {*} state state of the application forms
 * @param {*} action Redux action to perform on the state
 */
export const applicationFormReducer = (
  state = initialApplicationFormState,
  action
) => {
  switch (action.type) {
    case ApplicationFormKeys.SET_COUNTRIES: {
      return {
        ...state,
        countries: action.countries,
      };
    }
    case ApplicationFormKeys.SET_GENDERS: {
      return {
        ...state,
        genders: action.genders,
      };
    }
    case ApplicationFormKeys.SET_ACADEMIC_STANDINGS: {
      return {
        ...state,
        academicStandings: action.academicStandings,
      };
    }
    default:
      return state;
  }
};
