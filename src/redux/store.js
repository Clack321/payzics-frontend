import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth';
import routes from '../routes';
export const store = () => {
  // console.error(routes);
  // return routes
  return configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      'auth': authSlice,
      'api': routes.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(routes.middleware),
  })
}