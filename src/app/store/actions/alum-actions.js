import { AlumKeys } from './action-constants';

export const getAlumni = () => ({
  type: AlumKeys.GET_ALUMNI,
});

export const setAlumni = (alumni) => ({
  type: AlumKeys.SET_ALUMNI,
  alumni,
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
