import {CandidateApplicationKeys} from '../actions/action-constants';

export const initialCandidateApplications = {
    available: [],
    current: null,
    candidateApplicationSummary: {},
    stages: [],
    tracks: [],
    countries: [],
    totalCandidates: 0,
    displayingCandidates: 0,
};

export const candidateApplicationReducer = (state = initialCandidateApplications, action) => {
    switch (action.type) {
        case CandidateApplicationKeys.SET_CANDIDATES: {
            return {
                ...state,
                available: action.candidates.content,
                displayingCandidates: action.candidates.numberOfElements
            };
        }

        case CandidateApplicationKeys.SET_TOTAL_CANDIDATES: {
            return {
                ...state,
                totalCandidates: action.count
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

        case CandidateApplicationKeys.SET_RECRUITMENT_CYCLE_DETAILS: {
            return {
                ...state,
                stages: action.data.listOfStages,
                tracks: action.data.recruitmentCycleTracks
            }
        }

        case CandidateApplicationKeys.SET_COUNTRIES_FOR_SEARCH: {
            return {
                ...state,
                countries: action.data
            }
        }

        default:
            return state;
    }
};
