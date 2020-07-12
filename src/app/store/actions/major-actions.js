import { MajorKeys } from './action-constants';

export const getMajors = () => ({
  type: MajorKeys.GET_MAJORS,
});

export const setMajors = (majors) => ({
  type: MajorKeys.SET_MAJORS,
  majors,
});

export const updateMajor = (name, code) => ({
  type: MajorKeys.UPDATE_MAJOR,
  name,
  code,
});

export const createMajor = (name) => ({
  type: MajorKeys.CREATE_MAJOR,
  name,
});

export const deleteMajor = (code) => ({
  type: MajorKeys.DELETE_MAJOR,
  code,
});

export const setCurrentMajor = (record) => ({
  type: MajorKeys.SET_CURRENT_MAJOR,
  record,
});
