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

export const getApplicationTracks = () => ({
  type: ApplicationFormKeys.GET_APPLICATION_TRACKS,
});

export const getApplicationEssayQuestions = (cycleReference) => ({
  type: ApplicationFormKeys.GET_APPLICATION_ESSAY_QUESTIONS,
  cycleReference,
});

export const setApplicationTracks = (applicationTracks) => ({
  type: ApplicationFormKeys.GET_APPLICATION_TRACKS,
  applicationTracks,
});

export const setApplicationEssayQuestions = (essayQuestions) => ({
  type: ApplicationFormKeys.GET_APPLICATION_ESSAY_QUESTIONS,
  essayQuestions,
});
