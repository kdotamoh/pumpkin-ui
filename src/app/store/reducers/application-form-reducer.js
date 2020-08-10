import { ApplicationFormKeys } from '../actions/action-constants';

export const initialApplicationFormState = {
  countries: [],
  genders: [],
  academicStandings: [],
  universities: [],
  majors: [],
  formStatus: {
    valid: null,
    cycleDetails: {},
    error: null,
  },
  essayQuestionStatus: {
    valid: null,
    questionDetails: {},
    error: null,
  },
  essayQuestions: [],
  tracks: [],
  essayResponse: [],
  additionalEssayWordCount: 0,
  submissionStatus: {
    submissionResponse: null,
    error: null,
  },
  candidateCV: null,
  candidatePhoto: null,
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
          error: action.error,
        },
      };
    }
    case ApplicationFormKeys.SET_ESSAY_VALIDATION_STATUS: {
      return {
        ...state,
        essayQuestionStatus: {
          valid: action.valid,
          questionDetails: action.questionDetails,
          error: action.error,
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
    case ApplicationFormKeys.STORE_ADDITIONAL_ESSAY_WORD_COUNT: {
      return {
        ...state,
        additionalEssayWordCount: action.wordCount,
      };
    }
    case ApplicationFormKeys.SET_UNIVERSITIES: {
      return {
        ...state,
        universities: action.universities,
      };
    }
    case ApplicationFormKeys.SET_MAJORS: {
      return {
        ...state,
        majors: action.majors,
      };
    }
    case ApplicationFormKeys.SET_SUBMISSION_RESPONSE: {
      return {
        ...state,
        submissionStatus: {
          submissionResponse: action.response,
          error: action.error,
        },
      };
    }
    case ApplicationFormKeys.STORE_CANDIDATE_CV: {
      return {
        ...state,
        candidateCV: action.cv,
      };
    }
    case ApplicationFormKeys.STORE_CANDIDATE_PHOTO: {
      return {
        ...state,
        candidatePhoto: action.photo,
      };
    }
    default:
      return state;
  }
};
