import buildQuery from './buildQuery';
import buildMutation from './buildMutation';
/*
an endpoint can either by a query, or a mutation.
a query is most easily thought as a request that recieves data but doesn't change anything on the server (aka only get requests are queries)
a mutation is a request that DOES change something on the server (patch/put/get/post) thus invalidates the cache and tells any subscribed components to re-request in an optimized way.
*/

const buildEndPoint = (endPointObject) => {
  const {
    type, //(it can be get/post/patch/put/delete/update(which is just a map to a put)/create(map to post))
    route, //what is the service endpoint for example if we were trying to getUserById, then the route is 'user'
    routeParams, //what are the params for the route so if we were trying to getUserById then the queryParams is the users uid (aka 2934892jsf3924u239 or whatever)
    trasformResponse, // a function that has a single paramter (the response) that mutates the response before dispatching the action to update the store
    onQueryStarted,
    // onCacheEntryAdded, // a function that accepts the same param as query param and arguments 
    providesTags, //provides tags means when the tag provided is invalidated (updated with a mutation) it will automatically refetch and update the cache with the new data
    invalidatesTags, //force all endpoints with this tag as a provided tag to force refetch and cache result
    //both providesTags and invalidates tags can either be an array of strings, an array of objects with (type: tagType, id: arg)
    //or a function that has props (result, error, arg) and returns either of the first two results
  } = endPointObject;
  const isQuery = (type === 'get' || type === 'getById');
  let endPointObj = {};
  if (isQuery) {
    endPointObj.query = ({ ...query }) => {
      return buildQuery({route, routeParams, query})
      }
  } else {
    endPointObj.query = ({ ...body }) => buildMutation({route, type, id: body?.id , body})
  }
  if (trasformResponse) {
    endPointObj.trasformResponse = trasformResponse;
  }
  if (onQueryStarted) {
    endPointObj.onQueryStarted = onQueryStarted;
  }
  // if (onCacheEntryAdded) {
  //   endPointObj.onCacheEntryAdded
  // }
  if (providesTags) {
    endPointObj.providesTags = providesTags;
  }
  if (invalidatesTags) {
    endPointObj.invalidatesTags = invalidatesTags;
  }
  
  return endPointObj;
};

export default buildEndPoint;