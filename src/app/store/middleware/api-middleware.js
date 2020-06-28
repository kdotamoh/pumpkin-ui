import {
  EmployeeKeys,
  AlumKeys,
  TrackKeys,
  CycleKeys,
} from '../actions/action-constants';
import * as EmployeeService from 'api/user-management/employee';
import * as AlumService from 'api/user-management/alum';
import * as TrackService from 'api/track';
import * as CycleService from 'api/cycle';
import { setEmployees, getEmployees } from '../actions/employee-actions';
import { setAlumni, getAlumni } from '../actions/alum-actions';
import { message } from 'antd';
import { setTracks, getTracks } from '../actions/track-actions';
import { setCycles, getCycles } from '../actions/cycle-actions';

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
    default:
      return {};
  }
  return result;
};
