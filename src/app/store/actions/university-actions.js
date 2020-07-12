import { UniversityKeys } from './action-constants';

export const getUniversities = () => ({
  type: UniversityKeys.GET_UNIVERSITIES,
});

export const setUniversities = (universities) => ({
  type: UniversityKeys.SET_UNIVERSITIES,
  universities,
});

export const updateUniversity = (name, code) => ({
  type: UniversityKeys.UPDATE_UNIVERSITY,
  name,
  code,
});

export const createUniversity = (name, country) => ({
  type: UniversityKeys.CREATE_UNIVERSITY,
  name,
  country,
});

export const deleteUniversity = (code) => ({
  type: UniversityKeys.DELETE_UNIVERSITY,
  code,
});

export const setCurrentUniversity = (record) => ({
  type: UniversityKeys.SET_CURRENT_UNIVERSITY,
  record,
});
