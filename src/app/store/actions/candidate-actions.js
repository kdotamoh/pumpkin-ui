import { CandidateKeys } from './action-constants';

export const submitCandidateApplicationForm = (cycleReference, values) => ({
  type: CandidateKeys.SUBMIT_CANDIDATE_APPLICATION_FORM,
  cycleReference,
  values,
});
