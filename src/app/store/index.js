import { configureStore } from '@reduxjs/toolkit';
import rootreducer from './rootReducer';

const store = configureStore({
  reducer: rootreducer,
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;
