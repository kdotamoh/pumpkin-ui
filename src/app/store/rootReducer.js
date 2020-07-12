import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth';
import { employeeReducer } from './reducers/employee-reducer';
import { alumReducer } from './reducers/alum-reducer';
import { trackReducer } from './reducers/track-reducer';
import { cycleReducer } from './reducers/cycle-reducer';
import { universityReducer } from './reducers/university-reducer';
import { majorReducer } from './reducers/major-reducer';

const rootReducer = combineReducers({
  user: authReducer,
  employees: employeeReducer,
  alumni: alumReducer,
  tracks: trackReducer,
  cycles: cycleReducer,
  universities: universityReducer,
  majors: majorReducer,
});

export default rootReducer;
