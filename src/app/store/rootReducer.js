import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth';
import { employeeReducer } from './reducers/employee-reducer';
import { alumReducer } from './reducers/alum-reducer';

const rootReducer = combineReducers({
  user: authReducer,
  employees: employeeReducer,
  alumni: alumReducer,
});

export default rootReducer;
