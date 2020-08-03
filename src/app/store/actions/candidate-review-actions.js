import { CandidateApplicationReviewKeys } from './action-constants';

export const getRecruitmentCycleReviewSummary = (cycleReference) => ({
  type: CandidateApplicationReviewKeys.GET_RECRUITMENT_CYCLE_REVIEW_SUMMARY,
  cycleReference,
});

export const setRecruitmentCycleReviewSummary = (recruitmentCycleReviewSummary) => ({
  type: CandidateApplicationReviewKeys.SET_RECRUITMENT_CYCLE_REVIEW_SUMMARY,
  recruitmentCycleReviewSummary,
});

export const getApplicationReviewerSummary = (reviewerCode) => ({
  type: CandidateApplicationReviewKeys.GET_APPLICATION_REVIEWER_SUMMARY,
  reviewerCode,
});

export const setApplicationReviewerSummary = (applicationReviewerSummary) => ({
  type: CandidateApplicationReviewKeys.SET_APPLICATION_REVIEWER_SUMMARY,
  applicationReviewerSummary,
});

export const getCandidateApplicationReviews = (reviewerCode, seoDecision) => ({
  type: CandidateApplicationReviewKeys.GET_CANDIDATE_APPLICATION_REVIEWS,
  reviewerCode,
  seoDecision,
});

export const searchCandidateApplicationReviews = (reviewerCode, seoDecision, searchKey) => ({
  type: CandidateApplicationReviewKeys.SEARCH_CANDIDATE_APPLICATION_REVIEWS,
  reviewerCode,
  seoDecision,
  searchKey,
});

export const setCandidateApplicationReviews = (candidateApplicationReviews) => ({
  type: CandidateApplicationReviewKeys.SET_CANDIDATE_APPLICATION_REVIEWS,
  candidateApplicationReviews,
});
