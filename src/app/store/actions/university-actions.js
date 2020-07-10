import { UniversityKeys } from './action-constants';

export const getUniversities = () => ({
  type: UniversityKeys.GET_UNIVERSITIES,
});

export const addUniversity = (name, country) => ({
  type: UniversityKeys.ADD_UNIVERSITY,
  name,
  country,
});

export const updateUniversity = (code, name, country) => ({
  type: UniversityKeys.UPDATE_UNIVERSITY,
  name,
  code,
  country,
});

export const deleteUniversity = (code) => ({
  type: UniversityKeys.DELETE_UNIVERSITY,
  code,
});

export const activateUniversity = (code) => ({
  type: UniversityKeys.ACTIVATE_UNIVERSITY,
  code,
});

export const getUniversityMajors = () => ({
  type: UniversityKeys.GET_UNIVERSITY_MAJORS,
});

export const addUniversityMajor = (name, country) => ({
  type: UniversityKeys.ADD_UNIVERSITY_MAJOR,
  name,
  country,
});

export const updateUniversityMajor = (code, name, country) => ({
  type: UniversityKeys.UPDATE_UNIVERSITY_MAJOR,
  name,
  code,
  country,
});

export const deleteUniversityMajor = (code) => ({
  type: UniversityKeys.DELETE_UNIVERSITY_MAJOR,
  code,
});

export const activateUniversityMajor = (code) => ({
  type: UniversityKeys.ACTIVATE_UNIVERSITY_MAJOR,
  code,
});

export const setUniversities = (universities) => ({
  type: UniversityKeys.SET_UNIVERSITIES,
  universities,
});
export const setUniversityMajors = (universityMajors) => ({
  type: UniversityKeys.SET_UNIVERSITY_MAJORS,
  universityMajors,
});
