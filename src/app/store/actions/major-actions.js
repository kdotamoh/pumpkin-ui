import {MajorKeys} from './action-constants';

export const getMajors = (currentPage = 0) => ({
    type: MajorKeys.GET_MAJORS,
    currentPage
});

export const setMajors = (majors) => ({
    type: MajorKeys.SET_MAJORS,
    majors,
});

export const setMajorsCount = (total) => ({
    type: MajorKeys.SET_MAJORS_COUNT,
    total,
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
