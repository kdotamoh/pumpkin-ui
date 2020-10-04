import { AlumKeys } from './action-constants';

export const getAlumni = (currentPage) => ({
  type: AlumKeys.GET_ALUMNI,
  currentPage
});

export const setAlumni = (alumni) => ({
  type: AlumKeys.SET_ALUMNI,
  alumni,
});

export const setAlumniCount = (total) => ({
  type: AlumKeys.SET_ALUMNI_COUNT,
  total,
});

export const inviteAlum = (email, seoGraduationYear) => ({
  type: AlumKeys.INVITE_ALUM,
  email,
  seoGraduationYear,
});

export const deleteAlum = (email) => ({
  type: AlumKeys.DELETE_ALUM,
  email,
});

export const searchAlumni = (searchKey) => ({
  type: AlumKeys.SEARCH_ALUMNI,
  searchKey,
});

export const setCurrentAlum = (record) => ({
  type: AlumKeys.SET_CURRENT_ALUM,
  record,
});
