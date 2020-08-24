import {CandidateApplicationKeys} from '../actions/action-constants';

export const initialCandidateApplications = {
    candidatesHasBeenLoaded: false,
    available: [],
    current: null,
    candidateApplicationSummary: {},
    stages: [],
    tracks: [],
    countries: [],
    totalCandidates: 0,
    displayingCandidates: 0,
    reviewTypes: [],
    cycleReference: '',
    searchFilters: {
        university: null,
        stageCode: null,
        trackCode: null,
        status: null,
        country: null,
        name: null,
        searchKey: '',
    },
    dropdownValues: {
        stage: 'Stage',
        track: 'Track',
        country: 'Country',
        status: 'Status'
    }
};

export const candidateApplicationReducer = (state = initialCandidateApplications, action) => {
    switch (action.type) {
        case CandidateApplicationKeys.SET_CANDIDATES: {
            return {
                ...state,
                available: action.candidates.content,
                candidatesHasBeenLoaded: true,
                displayingCandidates: action.candidates.numberOfElements,
                totalCandidates: action.candidates.totalElements
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

        case CandidateApplicationKeys.SET_REVIEW_TYPES: {
            return {
                ...state,
                reviewTypes: action.reviewTypes
            }
        }

        case CandidateApplicationKeys.SET_CYCLE_REFERENCE: {
            return {
                ...state,
                cycleReference: action.cycleReference
            }
        }

        case CandidateApplicationKeys.ON_SEARCH_FILTER_SELECTED: {
            let filters = {...state.searchFilters};
            filters[action.target] = action.code;
            let dropdownValues = {...state.dropdownValues};
            dropdownValues[action.dropdownTarget || action.target] = action.dropdownData.children;
            return {
                ...state,
                searchFilters: filters,
                dropdownValues
            }
        }

        case CandidateApplicationKeys.ON_TEXT_INPUT_CHANGED: {
            let filters = {...state.searchFilters};
            filters[action.target] = action.value;
            return {
                ...state,
                searchFilters: filters
            }
        }

        case CandidateApplicationKeys.ON_CLEAR_FILTER: {
            return {
                ...state,
                searchFilters: {
                    university: null,
                    stageCode: null,
                    trackCode: null,
                    status: null,
                    country: null,
                    name: null,
                    searchKey: '',
                },
                dropdownValues: {
                    stage: 'Stage',
                    track: 'Track',
                    country: 'Country',
                    status: 'Status'
                }
            }
        }

        default:
            return state;
    }
};
