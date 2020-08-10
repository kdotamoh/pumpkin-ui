import {CandidateApplicationKeys} from "./action-constants";

export const getCandidates = () => ({
    type: CandidateApplicationKeys.GET_CANDIDATES
});

export const setCandidates = (candidates) => ({
    type: CandidateApplicationKeys.SET_CANDIDATES,
    candidates
});

export const setCurrentCandidate = (candidate) => ({
    type: CandidateApplicationKeys.SET_CURRENT_CANDIDATE,
    candidate
});

export const getCandidateApplicationSummary = (reference) => ({
    type: CandidateApplicationKeys.GET_CANDIDATE_SUMMARY,
    reference
});

export const setCandidateApplicationSummary = (candidateApplicationSummary) => ({
    type: CandidateApplicationKeys.SET_CANDIDATE_SUMMARY,
    candidateApplicationSummary
});