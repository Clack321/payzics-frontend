export default function stringifyObject(obj, delineator=',') {
  let stringifiedObject = '';
  if(typeof obj === 'object' && !obj?.length) {
      const entries = Object.entries(obj);
      entries.forEach((objEntry, i) => {
          stringifiedObject += `${objEntry[0]}:${objEntry[1]}${i + 1 !== entries.length ? delineator : ''}`;
      });
  }
  return stringifiedObject;
}
