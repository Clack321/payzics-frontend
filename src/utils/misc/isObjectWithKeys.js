const isObjectWithKeys = (obj) => {
  return (obj &&
    typeof obj === 'object' &&
    !Array.isArray(obj) &&
    Object.keys(obj)?.length)
}

export default isObjectWithKeys;