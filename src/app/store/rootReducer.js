import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth';

const rootReducer = combineReducers({
  user: authReducer,
});

export default rootReducer;
