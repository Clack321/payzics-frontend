import { convertObjectToQueryParams, isObjectWithKeys } from '../../misc';
export default function buildQueryString(route, routeParamCount, argumentsPassedInToQueryFromExternalCode) {
  let url = '';
  // if (routeParamCount !== 0 && routeParamCount) {
  //     if (Array.isArray(argumentsPassedInToQueryFromExternalCode)) {
  //       for (let i = 0; i < routeParamCount; i++) {
  //         url += `/${argumentsPassedInToQueryFromExternalCode[i]}`;
  //       }
  //     } else {
  //       if (//is a string with a length of 1, or it's a number.
  //         (argumentsPassedInToQueryFromExternalCode?.length === 1 && typeof argumentsPassedInToQueryFromExternalCode === 'string') 
  //         || typeof argumentsPassedInToQueryFromExternalCode === 'number') {
  //         url += `/${argumentsPassedInToQueryFromExternalCode}`
  //       } else {
  //         console.error('Query (get) to ', route, 'was passed incorrect route params. failing silently and proceeding with the request assuming no route params were provided',
  //         argumentsPassedInToQueryFromExternalCode)
  //       }
  //     }
  //   }
  if (isObjectWithKeys(argumentsPassedInToQueryFromExternalCode)) {
    const { id } = argumentsPassedInToQueryFromExternalCode;
    if (id) {
      url += `/${id}`;
    }
    url += convertObjectToQueryParams(argumentsPassedInToQueryFromExternalCode, 'id');
  } else if (typeof argumentsPassedInToQueryFromExternalCode === 'string' && argumentsPassedInToQueryFromExternalCode?.length) {
    if (argumentsPassedInToQueryFromExternalCode[0] === '?') {
      url += argumentsPassedInToQueryFromExternalCode;
    } else {
      url += `?${argumentsPassedInToQueryFromExternalCode}`;
    }
  } else {
    console.error(`The query provided to ${url} was not supplied with a type of object or string or was empty. Failing silently and proceeding with the request assuming no query params were provided`,
    argumentsPassedInToQueryFromExternalCode, 'was supplied. ')
  }
  return url;
}
