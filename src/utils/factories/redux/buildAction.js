import { createAction } from '@reduxjs/toolkit'
//"slice" is the top level description. Ex: "system"

/*
actionStr is a string that is the name of the action.
Extra: actionStr is the key of the cases object used in buildReducer and buildSlice factory utils.
*/

/*
"prepare" is a function. The purpose of the prepare function is the mutate the value of the action that gets passed to the reducer
example: 
function prepare(text) {
  return {
    payload: {
      text,
      createdAt: new Date().toISOString(),
    },
  }
  const action = buildAction('slice', 'action', prepare);
}
*/
const buildAction = ({ slice, actionStr, prepare }) => {
  if (prepare) {
    return createAction(`${slice}/${actionStr}`, prepare);
  } else {
    return createAction(`${slice}/${actionStr}`);
  }
  
};

export default buildAction;