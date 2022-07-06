import { buildRoute } from '../api';
import buildCache from './buildCache';

const buildFeathersQuery = (queryType, serviceName) => {
  let feathersQueryObject = {
    route: serviceName,
    type: queryType,
  };
  const cacheCallback = (result, error, argumentsPassedIntoQuery) => {
    if(error) {
      console.error(serviceName, queryType, 'service request failed.', 'Arguments passed in: ', argumentsPassedIntoQuery, ' Error: ', error);
    } else if (result) {
      return buildCache(queryType, serviceName, result, argumentsPassedIntoQuery)
    } else {
      console.error(serviceName, queryType, 'service request did not fail, but returned no data.', 'Arguments passed in: ', argumentsPassedIntoQuery);
      return buildCache(queryType, serviceName, result, argumentsPassedIntoQuery)
    }
  }
  if (queryType === 'get' || queryType === 'getById') {
    feathersQueryObject.providesTags = cacheCallback;
  } else {
    feathersQueryObject.invalidatesTags = cacheCallback;
  }
  return buildRoute(feathersQueryObject);
}

export default buildFeathersQuery;