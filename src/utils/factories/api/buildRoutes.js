/* eslint-disable default-case */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { HYDRATE } from 'next-redux-wrapper'
import buildServices from '../feathers/buildServices';
// import buildCustomRoutes from '../api/buildCustomRoutes';

// import { capitalize } from '@/utils/string/mutators';
//https://redux-toolkit.js.org/rtk-query/api/createApi
// a factory that creates a "service" using a base URL and expected endpoints.
// each endpoint will produce a hook that returns an object. 
// on every object returned from the endpoint hook there are 7 properties
// the properties on the object returned from the hook are: data, status, error, isLoading, isFetching, isSuccess, and isError.
// refetchAfter is a number of seconds since the call was requested should it grab data from the cache or refetch
// the default behavior for refetchAfter is: if there are atleast 1 components subscribied to a particular query then it retrieves from cache always
// if there are NO (0) components that are subscribed (used a hook to listen to the response) then it will look into the cache if a request comes 60 seconds before the last unsubscription
const buildRouteObject = (builder, type, queryObj) => {
  if (type === 'query') {
    return builder.query(queryObj);
  } else {
    return builder.mutation({...queryObj})
  }
}
const buildRoutes = () => {
  const feathersServices = buildServices();
  let aggregatedEndPoints = [];
  feathersServices.forEach((service) => {
    Object.entries(service).forEach(([serviceName, methods]) => {
      Object.entries(methods).forEach(([methodName, query]) => {
        switch (methodName) {
          //the issue is that type isn't defined because builder.mutation is being called instead
          case 'get':
            aggregatedEndPoints.push([`get${serviceName}`, query])
            break;
          case 'getById':
            aggregatedEndPoints.push([`get${serviceName}ById`, query])
            break;
          case 'create':
            aggregatedEndPoints.push([`create${serviceName}`, query])
            break;
          case 'update':
            aggregatedEndPoints.push([`update${serviceName}ById`, query])
            break;
          case 'patch':
            aggregatedEndPoints.push([`patch${serviceName}ById`, query])
            break;
          case 'delete':
            aggregatedEndPoints.push([`delete${serviceName}ById`, query])
        }
      })
    })
  });

  const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_MONOLITH_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState()).auth.token
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  })
    return createApi({
    reducerPath: 'api',
    baseQuery,
    refetchOnReconnect: true,
    endpoints: (builder) => {
      let buildObj = {
        authentication: builder.mutation({
          query: (body) => ({
            url: `authentication`,
            method: 'POST',
            body,
          }),
      })};
      aggregatedEndPoints.forEach((entry) => {
        const [ methodName, serviceObj ] = entry;
        buildObj[methodName] = buildRouteObject(builder, methodName.includes('get') ? 'query' : 'mutation', serviceObj)
    })
    return buildObj;
  },
  })
};

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export default buildRoutes