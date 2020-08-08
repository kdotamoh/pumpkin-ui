import { ApplicationFormKeys } from './action-constants';

export const getCountries = () => ({
  type: ApplicationFormKeys.GET_COUNTRIES,
});

export const getGenders = () => ({
  type: ApplicationFormKeys.GET_GENDERS,
});

export const getAcademicStandings = () => ({
  type: ApplicationFormKeys.GET_ACADEMIC_STANDINGS,
});

export const setCountries = (countries) => ({
  type: ApplicationFormKeys.SET_COUNTRIES,
  countries,
});

export const setGenders = (genders) => ({
  type: ApplicationFormKeys.SET_GENDERS,
  genders,
});

export const setAcademicStandings = (academicStandings) => ({
  type: ApplicationFormKeys.SET_ACADEMIC_STANDINGS,
  academicStandings,
});

export const getApplicationTracks = (cycleReference) => ({
  type: ApplicationFormKeys.GET_APPLICATION_TRACKS,
  cycleReference,
});

export const getApplicationEssayQuestions = (cycleReference) => ({
  type: ApplicationFormKeys.GET_APPLICATION_ESSAY_QUESTIONS,
  cycleReference,
});

export const setApplicationTracks = (applicationTracks) => ({
  type: ApplicationFormKeys.SET_APPLICATION_TRACKS,
  applicationTracks,
});

export const setApplicationEssayQuestions = (essayQuestions) => ({
  type: ApplicationFormKeys.SET_APPLICATION_ESSAY_QUESTIONS,
  essayQuestions,
});

export const validateApplicationForm = (reference) => ({
  type: ApplicationFormKeys.VALIDATE_APPLICATION_FORM,
  reference,
});

export const setFormValidationStatus = (valid, cycleDetails, error) => ({
  type: ApplicationFormKeys.SET_FORM_VALIDATION_STATUS,
  valid,
  cycleDetails,
  error,
});

export const validateEssayQuestion = (questionCode) => ({
  type: ApplicationFormKeys.VALIDATE_ESSAY_QUESTION,
  questionCode,
});

export const setEssayValidationStatus = (valid, questionDetails, error) => ({
  type: ApplicationFormKeys.SET_ESSAY_VALIDATION_STATUS,
  valid,
  questionDetails,
  error,
});

export const submitAdditionalEssay = (values) => ({
  type: ApplicationFormKeys.SUBMIT_ADDITIONAL_ESSAY,
  values,
});

export const storeEssay = (code, response, wordCount) => ({
  type: ApplicationFormKeys.STORE_ESSAY,
  code,
  response,
  wordCount,
});

export const storeAdditionalEssayWordCount = (wordCount) => ({
  type: ApplicationFormKeys.STORE_ADDITIONAL_ESSAY_WORD_COUNT,
  wordCount,
});

export const setApplicationFormUniversities = (universities) => ({
  type: ApplicationFormKeys.SET_UNIVERSITIES,
  universities,
});

export const setApplicationFormMajors = (majors) => ({
  type: ApplicationFormKeys.SET_MAJORS,
  majors,
});

export const getApplicationFormUniversities = (country) => ({
  type: ApplicationFormKeys.GET_APPLICATION_FORM_UNIVERSITIES,
  country,
});

export const getApplicationFormMajors = () => ({
  type: ApplicationFormKeys.GET_APPLICATION_FORM_MAJORS,
});

export const setSubmissionResponse = (response, error) => ({
  type: ApplicationFormKeys.SET_SUBMISSION_RESPONSE,
  response,
  error,
});

export const storeCandidateCV = (cv) => ({
  type: ApplicationFormKeys.STORE_CANDIDATE_CV,
  cv,
});
export const storeCandidatePhoto = (photo) => ({
  type: ApplicationFormKeys.STORE_CANDIDATE_PHOTO,
  photo,
});
