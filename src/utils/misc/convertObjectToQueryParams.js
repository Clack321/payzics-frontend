const convertObjectToQueryParams = (queryObject, keysToFilter) => {
  const keys = queryObject && typeof queryObject === 'object' ? Object.keys(queryObject) : [];
  const queryKeys = keys.filter(key => queryObject?.[key] && !keysToFilter.includes(key));
  return `?${queryKeys.map(key => `&${key}=${queryObject[key]}`).join('')}`
};

export default convertObjectToQueryParams;