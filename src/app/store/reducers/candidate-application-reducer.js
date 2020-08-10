import { CandidateApplicationKeys } from '../actions/action-constants';

export const initialCandidateApplications = {
    available: [],
    current: null,
    candidateApplicationSummary: {}
};

export const candidateApplicationReducer = (state = initialCandidateApplications, action) => {
    switch (action.type) {
        case CandidateApplicationKeys.SET_CANDIDATES: {
            return {
                ...state,
                available: action.candidates,   
            };
        }

        case CandidateApplicationKeys.SET_CURRENT_CANDIDATE: {
            return {
                ...state,
                current: action.candidate
            }
        }

        case CandidateApplicationKeys.SET_CANDIDATE_SUMMARY: {
            return {
                ...state,
                candidateApplicationSummary: action.candidateApplicationSummary
            }
        }

        default:
            return state;
    }
};
