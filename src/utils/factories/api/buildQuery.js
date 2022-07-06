  //https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery
  // although this is basically a private factory because I don't expect it to be used anywhere besides buildEndPoint, I think I should explain what a "query is/does with RKT-query"
  //oversimplification: a "query" is a request.
  /*
    A query creates 5 hooks when used in the buildEndPoint -> buildRoutes. the "route" if it was of type get will have 5 hooks as defined below: 
    useQuery
      Composes useQuerySubscription and useQueryState and is the primary hook.
      Automatically triggers fetches of data from an endpoint,
      'subscribes' the component to the cached data, and reads the request status and cached data from the Redux store.
    useQuerySubscription
      Returns a refetch function and accepts all hook options.
      Automatically triggers fetches of data from an endpoint, and 'subscribes' the component to the cached data.
    useQueryState
      Returns the query state and accepts skip and selectFromResult.
      Reads the request status and cached data from the Redux store.
    useLazyQuery
      Returns a tuple with a fetch function,
      the query result, and last promise info.
      Similar to useQuery,
      but with manual control over when the data fetching occurs.
    useLazyQuerySubscription
      Returns a tuple with a fetch function,
      and last promise info.
      Similar to useQuerySubscription,
      but with manual control over when the data fetching occurs.

    Each of these hooks accepts two props, (routeParams: string, queryOptions: object).
    arguments is a string of what's being passed to the query itself aka ('${userId}/${orgId}/${teamId}`)
    queryOptions is an option with properties as defined below:
      skip - Allows a query to 'skip' running for that render. Defaults to false
      pollingInterval - Allows a query to automatically refetch on a provided interval, specified in milliseconds. Defaults to 0 (off)
      selectFromResult - Allows altering the returned value of the hook to obtain a subset of the result, render-optimized for the returned subset.
      refetchOnMountOrArgChange - Allows forcing the query to always refetch on mount (when true is provided).
        Allows forcing the query to refetch if enough time (in seconds) has passed since the last query for the same cache (when a number is provided). Defaults to false
      refetchOnFocus - Allows forcing the query to refetch when the browser window regains focus. Defaults to false
      refetchOnReconnect - Allows forcing the query to refetch when regaining a network connection. Defaults to false

    In general each one of these query hooks will return an object with the properties as described below:
    data - The returned result if present.
    error - The error result if present.
    isUninitialized - When true, indicates that the query has not started yet.
    isLoading - When true, indicates that the query is currently loading for the first time, and has no data yet.
      This will be true for the first request fired off, but not for subsequent requests.
    isFetching - When true, indicates that the query is currently fetching, but might have data from an earlier request.
      This will be true for both the first request fired off, as well as subsequent requests.
    isSuccess - When true, indicates that the query has data from a successful request.
    isError - When true, indicates that the query is in an error state.
    refetch - A function to force refetch the query
  */
import buildQueryString from './buildQueryString';

const buildQuery = ({
  route,//what is the service endpoint for example if we were trying to getUserById, then the route is 'user'
  routeParams,//what comes after the route in the url? this should be an array. So if the backend route comsumes user/orgId/teamId then routeParams should be [orgId, teamId]
  query,//should be an array if the request requires route params (think /'s) or an object if you want (?key=value) params. you may also provide a raw query string, or regular string, it'll automagically figure it out
}) => {
  const endpointString = `${route}${buildQueryString(route, routeParams?.length, query)}`;
  return endpointString;
}

export default buildQuery;