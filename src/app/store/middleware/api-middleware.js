import {
  EmployeeKeys,
  AlumKeys,
  TrackKeys,
  ApplicationFormKeys,
  UniversityKeys,
  CycleKeys,
  MajorKeys,
  CandidateKeys,
} from '../actions/action-constants';
import * as EmployeeService from 'api/user-management/employee';
import * as AlumService from 'api/user-management/alum';
import * as TrackService from 'api/track';
import * as ApplicationFormService from 'api/application-form';
import * as CycleService from 'api/cycle';
import * as UniversityService from 'api/university';
import * as MajorService from 'api/majors';
import * as CandidateService from 'api/candidates';
import { setEmployees, getEmployees } from '../actions/employee-actions';
import { setAlumni, getAlumni } from '../actions/alum-actions';
import { message } from 'antd';
import { setTracks, getTracks } from '../actions/track-actions';
import {
  setCountries,
  setGenders,
  setAcademicStandings,
  setApplicationTracks,
  setApplicationEssayQuestions,
  setFormValidationStatus,
  setEssayValidationStatus,
} from '../actions/application-form-actions';
import { setCycles, getCycles } from '../actions/cycle-actions';
import {
  setUniversities,
  getUniversities,
} from '../actions/university-actions';
import { setMajors, getMajors } from '../actions/major-actions';

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
        const formStatus = await ApplicationFormService.validateForm(
          action.reference
        );
        sessionStorage.setItem('cycleReference', formStatus.responseBody.code);
        store.dispatch(
          setFormValidationStatus(
            formStatus.requestSuccessful,
            formStatus.responseBody
          )
        );
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
        const applicationTracks = await ApplicationFormService.getApplicationTracks(
          action.cycleReference
        );
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
    case ApplicationFormKeys.VALIDATE_ESSAY_QUESTION: {
      try {
        const formStatus = await ApplicationFormService.validateEssayQuestion(
          action.questionCode
        );
        store.dispatch(
          setEssayValidationStatus(
            formStatus.requestSuccessful,
            formStatus.responseBody
          )
        );
      } catch (err) {
        message.error(`Cannot validate essay question: ${err}`);
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
    case UniversityKeys.CREATE_UNIVERSITY:
      try {
        await UniversityService.createUniversity(action.name, action.country);
        store.dispatch(getUniversities());
      } catch (err) {
        message.error(`Cannot create university: ${err}`);
      }
      break;
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

    case UniversityKeys.UPDATE_UNIVERSITY: {
      try {
        await UniversityService.updateUniversity(action.name, action.code);
        store.dispatch(getUniversities());
      } catch (err) {
        message.error(`Cannot update university: ${err}`);
      }
      break;
    }

    case MajorKeys.GET_MAJORS:
      try {
        const majors = await MajorService.getMajors();
        const majorContent = majors.content;
        store.dispatch(setMajors(majorContent));
      } catch (err) {
        message.error(`Cannot get majors: ${err}`);
      }
      break;
    case MajorKeys.CREATE_MAJOR:
      try {
        await MajorService.createMajor(action.name);
        store.dispatch(getMajors());
      } catch (err) {
        message.error(`Cannot create major: ${err}`);
      }
      break;
    case MajorKeys.DELETE_MAJOR:
      try {
        await MajorService.deleteMajor(action.code);
      } catch (err) {
        message.error(`Cannot delete major: ${err}`);
      }
      break;
    case MajorKeys.UPDATE_MAJOR: {
      try {
        await MajorService.deleteMajor(action.name, action.code);
        store.dispatch(getMajors());
      } catch (err) {
        message.error(`Cannot update major: ${err}`);
      }
      break;
    }
    case MajorKeys.ACTIVATE_MAJOR: {
      try {
        await MajorService.activateMajor(action.code);
      } catch (err) {
        message.error(`Cannot activate university major: ${err}`);
      }
      break;
    }
    case CycleKeys.GET_CYCLES:
      try {
        const cycles = await CycleService.getCycles();
        const cycleContent = cycles.content;
        store.dispatch(setCycles(cycleContent));
      } catch (err) {
        message.error(`Cannot get cycles: ${err}`);
      }
      break;
    case CycleKeys.CREATE_CYCLE:
      try {
        await CycleService.createCycle(action.name);
        store.dispatch(getCycles());
      } catch (err) {
        message.error(`Cannot create cycle: ${err}`);
      }
      break;
    case CycleKeys.DELETE_CYCLE:
      try {
        await CycleService.deleteCycle(action.code);
      } catch (err) {
        message.error(`Cannot delete cycle: ${err}`);
      }
      break;
    case CycleKeys.UPDATE_CYCLE: {
      try {
        await CycleService.updateCycle(action.name, action.code);
        store.dispatch(getCycles());
      } catch (err) {
        message.error(`Cannot update cycle: ${err}`);
      }
      break;
    }
    case ApplicationFormKeys.SUBMIT_ADDITIONAL_ESSAY: {
      try {
        const responseSuccessful = await ApplicationFormService.submitAdditionalEssay(
          action.values
        );
        if (responseSuccessful) {
          message.info('Essay Submitted Successfully');
        }
      } catch (err) {
        message.error(`Cannot submit application: ${err}`);
      }
      break;
    }
    case CandidateKeys.SUBMIT_CANDIDATE_APPLICATION_FORM: {
      try {
        await CandidateService.submitCandidateApplicationForm(
          action.cycleReference,
          action.values
        );
        message.info('Application Submitted Successfully');
      } catch (err) {
        message.error(`Cannot submit application: ${err}`);
      }
      break;
    }
    default:
      return {};
  }
  return result;
};
