import {CandidateApplicationKeys} from "./action-constants";

export const getCandidates = (cycleReference) => ({
    type: CandidateApplicationKeys.GET_CANDIDATES,
    cycleReference
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

export const getRecruitmentCycleDetails = (code) => ({
    type: CandidateApplicationKeys.GET_RECRUITMENT_CYCLE_DETAILS,
    code
})

export const setRecruitmentCycleDetails = (data) => ({
    type: CandidateApplicationKeys.SET_RECRUITMENT_CYCLE_DETAILS,
    data
})

export const getCountriesForSearch = () => ({
    type: CandidateApplicationKeys.GET_COUNTRIES_FOR_SEARCH
})

export const setCountriesForSearch = (data) => ({
    type: CandidateApplicationKeys.SET_COUNTRIES_FOR_SEARCH,
    data
})

export const setTotalCandidatesCount = (count) => ({
    type: CandidateApplicationKeys.SET_TOTAL_CANDIDATES,
    count
})

export const searchCandidateApplication = (searchKeys, cycleReference) => ({
    type: CandidateApplicationKeys.SEARCH_CANDIDATE_APPLICATION,
    searchKeys,
    cycleReference
})