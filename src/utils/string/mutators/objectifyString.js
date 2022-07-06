export default function objectifyString(objString) { //the only time this should be used is if a get request requires a nested object and JSON.stringify is returning OBJECT OBJECT
  const objectifiedString = {};
  if(typeof objString === 'string' && objString.length) {
      const keyValueArray = objString.split(',');
      keyValueArray.forEach(stringifiedKeyValue => {
          const [key, value] = stringifiedKeyValue.split(':');
          objectifiedString[key] = value;
      });
  }
  return objectifiedString;
}
