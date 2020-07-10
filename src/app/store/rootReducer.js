import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth';
import { employeeReducer } from './reducers/employee-reducer';
import { alumReducer } from './reducers/alum-reducer';
import { trackReducer } from './reducers/track-reducer';
import { applicationFormReducer } from './reducers/application-form-reducer';
import { universityReducer } from './reducers/university-reducer';

const rootReducer = combineReducers({
  user: authReducer,
  employees: employeeReducer,
  alumni: alumReducer,
  tracks: trackReducer,
  applicationForm: applicationFormReducer,
  universities: universityReducer,
});

export default rootReducer;
