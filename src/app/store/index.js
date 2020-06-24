import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootreducer from './rootReducer';
import { appMiddleware } from './middleware/api-middleware';

const store = configureStore({
  reducer: rootreducer,
  middleware: [...getDefaultMiddleware(), appMiddleware],
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;
