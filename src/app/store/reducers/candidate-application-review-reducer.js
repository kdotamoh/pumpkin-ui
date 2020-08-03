import { CandidateApplicationReviewKeys } from '../actions/action-constants';

export const initialReviewState = {
    recruitmentCycleReviewSummary: {},
    available: [],
    applicationReviewerSummary: {},
};

export const candidateApplicationReviewReducer = (state = initialReviewState, action) => {
    switch (action.type) {
        case CandidateApplicationReviewKeys.SET_RECRUITMENT_CYCLE_REVIEW_SUMMARY: {
            return {
                ...state,
                recruitmentCycleReviewSummary: action.recruitmentCycleReviewSummary,
            };
        }
        case CandidateApplicationReviewKeys.SET_APPLICATION_REVIEWER_SUMMARY: {
            return {
                ...state,
                applicationReviewerSummary: action.applicationReviewerSummary,
            };
        }
        case CandidateApplicationReviewKeys.SET_CANDIDATE_APPLICATION_REVIEWS: {
            return {
                ...state,
                available: action.candidateApplicationReviews,
            };
        }
        default:
            return state;
    }
};
