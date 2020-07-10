import {
  EmployeeKeys,
  AlumKeys,
  TrackKeys,
  ApplicationFormKeys,
  UniversityKeys,
} from '../actions/action-constants';
import * as EmployeeService from 'api/user-management/employee';
import * as AlumService from 'api/user-management/alum';
import * as TrackService from 'api/track';
import * as ApplicationFormService from 'api/application-form';
import * as UniversityService from 'api/universities';
import { setEmployees, getEmployees } from '../actions/employee-actions';
import { setAlumni, getAlumni } from '../actions/alum-actions';
import { message } from 'antd';
import { setTracks, getTracks } from '../actions/track-actions';
import {
  setUniversities,
  setUniversityMajors,
} from '../actions/university-actions';
import {
  setCountries,
  setGenders,
  setAcademicStandings,
  setApplicationTracks,
  setApplicationEssayQuestions,
} from '../actions/application-form-actions';

export const appMiddleware = (store) => (next) => async (action) => {
  const result = next(action);
  switch (action.type) {
    case EmployeeKeys.GET_EMPLOYEES:
      try {
        const employees = await EmployeeService.getEmployees();
        const employeeContent = employees.content;
        store.dispatch(setEmployees(employeeContent));
      } catch (err) {
        message.error(`Cannot get employees: ${err}`);
      }
      break;
    case EmployeeKeys.INVITE_EMPLOYEE:
      try {
        await EmployeeService.inviteEmployee(action.email, action.employeeId);
        store.dispatch(getEmployees());
      } catch (err) {
        message.error(`Cannot invite employee: ${err}`);
      }
      break;
    case EmployeeKeys.DELETE_EMPLOYEE:
      try {
        await EmployeeService.deleteEmployee(action.email);
      } catch (err) {
        message.error(`Cannot delete employee: ${err}`);
      }
      break;
    case EmployeeKeys.SEARCH_EMPLOYEES: {
      try {
        const filteredEmployees = await EmployeeService.searchEmployees(
          action.searchKey
        );
        const employeeContent = filteredEmployees.content;
        store.dispatch(setEmployees(employeeContent));
      } catch (err) {
        message.error(`Cannot search employees: ${err}`);
      }
      break;
    }
    case AlumKeys.GET_ALUMNI:
      try {
        const alumni = await AlumService.getAlumni();
        const alumniContent = alumni.content;
        store.dispatch(setAlumni(alumniContent));
      } catch (err) {
        message.error(`Cannot get alumni: ${err}`);
      }
      break;
    case AlumKeys.INVITE_ALUM:
      try {
        await AlumService.inviteAlum(action.email, action.seoGraduationYear);
        store.dispatch(getAlumni());
      } catch (err) {
        message.error(`Cannot invite alum: ${err}`);
      }
      break;
    case AlumKeys.DELETE_ALUM:
      try {
        await AlumService.deleteAlum(action.email);
      } catch (err) {
        message.error(`Cannot delete alum: ${err}`);
      }
      break;
    case AlumKeys.SEARCH_ALUMNI: {
      try {
        const filteredAlumni = await AlumService.searchAlumni(action.searchKey);
        const alumniContent = filteredAlumni.content;
        store.dispatch(setAlumni(alumniContent));
      } catch (err) {
        message.error(`Cannot search alumni: ${err}`);
      }
      break;
    }

    case TrackKeys.GET_TRACKS:
      try {
        const tracks = await TrackService.getTracks();
        const trackContent = tracks.content;
        store.dispatch(setTracks(trackContent));
      } catch (err) {
        message.error(`Cannot get tracks: ${err}`);
      }
      break;
    case TrackKeys.CREATE_TRACK:
      try {
        await TrackService.createTrack(action.name);
        store.dispatch(getTracks());
      } catch (err) {
        message.error(`Cannot create track: ${err}`);
      }
      break;
    case TrackKeys.DELETE_TRACK:
      try {
        await TrackService.deleteTrack(action.code);
      } catch (err) {
        message.error(`Cannot delete track: ${err}`);
      }
      break;
    case TrackKeys.UPDATE_TRACK: {
      try {
        await TrackService.updateTrack(action.name, action.code);
        store.dispatch(getTracks());
      } catch (err) {
        message.error(`Cannot update track: ${err}`);
      }
      break;
    }
    case ApplicationFormKeys.VALIDATE_APPLICATION_FORM: {
      try {
        await ApplicationFormService.validateForm(action.reference);
        // dispatch an action
      } catch (err) {
        message.error(`Cannot validate application form: ${err}`);
      }
      break;
    }
    case ApplicationFormKeys.GET_COUNTRIES: {
      try {
        const countries = await ApplicationFormService.getCountries();
        store.dispatch(setCountries(countries));
      } catch (err) {
        message.error(`Cannot get countries: ${err}`);
      }
      break;
    }
    case ApplicationFormKeys.GET_GENDERS: {
      try {
        const genders = await ApplicationFormService.getGenders();
        store.dispatch(setGenders(genders));
      } catch (err) {
        message.error(`Cannot get genders: ${err}`);
      }
      break;
    }
    case ApplicationFormKeys.GET_ACADEMIC_STANDINGS: {
      try {
        const academicStandings = await ApplicationFormService.getAcademicStandings();
        store.dispatch(setAcademicStandings(academicStandings));
      } catch (err) {
        message.error(`Cannot get academic standings: ${err}`);
      }
      break;
    }
    case ApplicationFormKeys.GET_APPLICATION_TRACKS: {
      try {
        const applicationTracks = await ApplicationFormService.getApplicationTracks();
        store.dispatch(setApplicationTracks(applicationTracks));
      } catch (err) {
        message.error(`Cannot get application tracks: ${err}`);
      }
      break;
    }
    case ApplicationFormKeys.GET_APPLICATION_ESSAY_QUESTIONS: {
      try {
        const applicationEssayQuestions = await ApplicationFormService.getApplicationEssayQuestions(
          action.cycleReference
        );
        store.dispatch(setApplicationEssayQuestions(applicationEssayQuestions));
      } catch (err) {
        message.error(`Cannot get application essay questions: ${err}`);
      }
      break;
    }
    case UniversityKeys.GET_UNIVERSITIES: {
      try {
        const universities = await UniversityService.getUniversities();
        const universitiesContent = universities.content;
        store.dispatch(setUniversities(universitiesContent));
      } catch (err) {
        message.error(`Cannot get universities: ${err}`);
      }
      break;
    }
    case UniversityKeys.ADD_UNIVERSITY: {
      try {
        await UniversityService.addUniversity(action.name, action.country);
      } catch (err) {
        message.error(`Cannot add university: ${err}`);
      }
      break;
    }
    case UniversityKeys.UPDATE_UNIVERSITY: {
      try {
        await UniversityService.updateUniversity(
          action.code,
          action.name,
          action.country
        );
      } catch (err) {
        message.error(`Cannot update university: ${err}`);
      }
      break;
    }
    case UniversityKeys.DELETE_UNIVERSITY: {
      try {
        await UniversityService.deleteUniversity(action.code);
      } catch (err) {
        message.error(`Cannot delete university: ${err}`);
      }
      break;
    }
    case UniversityKeys.ACTIVATE_UNIVERSITY: {
      try {
        await UniversityService.activateUniversity(action.code);
      } catch (err) {
        message.error(`Cannot activate university: ${err}`);
      }
      break;
    }
    case UniversityKeys.GET_UNIVERSITY_MAJORS: {
      try {
        const universityMajors = await UniversityService.getUniversityMajors();
        const universityMajorsContent = universityMajors.content;
        store.dispatch(setUniversityMajors(universityMajorsContent));
      } catch (err) {
        message.error(`Cannot get university majors: ${err}`);
      }
      break;
    }
    case UniversityKeys.ADD_UNIVERSITY_MAJOR: {
      try {
        await UniversityService.addUniversityMajor(action.name, action.country);
      } catch (err) {
        message.error(`Cannot add university major: ${err}`);
      }
      break;
    }
    case UniversityKeys.UPDATE_UNIVERSITY_MAJOR: {
      try {
        await UniversityService.updateUniversityMajor(action.code, action.name);
      } catch (err) {
        message.error(`Cannot update university major: ${err}`);
      }
      break;
    }
    case UniversityKeys.DELETE_UNIVERSITY_MAJOR: {
      try {
        await UniversityService.deleteUniversityMajor(action.code);
      } catch (err) {
        message.error(`Cannot delete university major: ${err}`);
      }
      break;
    }
    case UniversityKeys.ACTIVATE_UNIVERSITY_MAJOR: {
      try {
        await UniversityService.activateUniversityMajor(action.code);
      } catch (err) {
        message.error(`Cannot activate university major: ${err}`);
      }
      break;
    }
    default:
      return {};
  }
  return result;
};
