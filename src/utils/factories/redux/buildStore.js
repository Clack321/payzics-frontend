import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {createWrapper} from 'next-redux-wrapper';
import buildRoutes from '@/utils/factories/api/buildRoutes';

const buildStore = (reducers, middleware, devTools=true, preloadedState, enhancers) => {
  let storeObj = {
    // reducer: reducers,
    devTools,
  }
  if (preloadedState) {
    storeObj.preloadedState = preloadedState;
  }
  if (middleware && middleware?.length) {
    storeObj.middleware = (getDefaultMiddleware) => getDefaultMiddleware().concat([...middleware]);
  }
  if (enhancers && enhancers?.length) {
    storeObj.enhancers = enhancers;
  }
  const routes = buildRoutes({});
  const rootReducer = combineReducers({api: routes.reducer})
  storeObj.reducer = rootReducer;
  return createWrapper(configureStore(storeObj));
}

export default buildStore;
