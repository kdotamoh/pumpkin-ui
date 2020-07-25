import { ApplicationFormKeys } from '../actions/action-constants';

export const initialApplicationFormState = {
  countries: [],
  genders: [],
  academicStandings: [],
  formStatus: {
    valid: false,
    cycleDetails: {},
  },
  essayQuestionStatus: {
    valid: false,
    questionDetails: {},
  },
  essayQuestions: [],
  tracks: [],
  essayResponse: [],
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
    case ApplicationFormKeys.SET_APPLICATION_ESSAY_QUESTIONS: {
      return {
        ...state,
        essayQuestions: action.essayQuestions,
      };
    }
    case ApplicationFormKeys.SET_APPLICATION_TRACKS: {
      return {
        ...state,
        tracks: action.applicationTracks,
      };
    }
    case ApplicationFormKeys.SET_FORM_VALIDATION_STATUS: {
      return {
        ...state,
        formStatus: {
          valid: action.valid,
          cycleDetails: action.cycleDetails,
        },
      };
    }
    case ApplicationFormKeys.SET_ESSAY_VALIDATION_STATUS: {
      return {
        ...state,
        essayQuestionStatus: {
          valid: action.valid,
          questionDetails: action.questionDetails,
        },
      };
    }
    case ApplicationFormKeys.STORE_ESSAY: {
      const currentEssayResponses = [...state.essayResponse];
      const code = action.code;
      const findEssay =
        currentEssayResponses.length > 0
          ? currentEssayResponses.findIndex(
              (essay) => essay.essayQuestionCode === code
            )
          : 0;
      if (findEssay >= 0) {
        currentEssayResponses[findEssay] = {
          essayQuestionCode: action.code,
          candidateResponse: action.response,
          wordCount: action.wordCount,
        };
        return {
          ...state,
          essayResponse: currentEssayResponses,
        };
      }
      currentEssayResponses.push({
        essayQuestionCode: action.code,
        candidateResponse: action.response,
        wordCount: action.wordCount,
      });
      return {
        ...state,
        essayResponse: currentEssayResponses,
      };
    }
    default:
      return state;
  }
};
