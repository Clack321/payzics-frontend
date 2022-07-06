import { createReducer } from '@reduxjs/toolkit';
//"slice" is the top level description. Ex: "system"

/*
"initialState" is an object with what this slices store is supposed to contain. 
initialState passed into buildReducer SHOULD ALWAYS be constant javascript object with only constants. (aka no requests or functions to update vars)
*/

/*"cases" is the action string as the key and the callback that accepts state, and action
/cases" should look like this: (lol nvm, it no longer has to be a pure function! :D)
const cases = { 
  increment: (state, action) => {
    const { payload } = action;
    let _state = { ...state };
    _state.counter += 1;
    return _state;
  }
  decrement: (state, action) => {
    const { payload } = action;
    let _state = { ...state };
    _state.counter -= 1;
    return _state;
  }
  ...etc
}

  notice how each function is a pure function (doesn't mutate state directly, but copies it first. and then replaces it).
  if using buildReducers you must make each callback pure. It is for this reason it is recommended to use buildSlice to create your actions, and reducers.
  "matchers" is NOT required and will just not apply matchers if not supplied.
  matchers is an array of functions. Each function is the output of the buildMatcher factory util.
  defaultCase is NOT required and will default to just doing nothing as the default case. This is simply a reducerCallback similar to the value of the cases object.

*/
const buildReducer = ({ slice, initialState, cases, matchers, defaultCase }) => {
  return createReducer(initialState, (builder) => {
      Object.entries(cases).forEach(([actionStr, reducerCallback]) => {
        builder.addCase(`${slice}/${actionStr}`, (state, action) => reducerCallback(state, action));
      });
      if (matchers) {
        matchers.forEach(matcher => {
          builder.addMatcher(matcher);
        })
      }
      if (defaultCase) {
        builder.addDefaultCase((state, action) => defaultCase(state, action));
      } else {
        builder.addDefaultCase(() => {});
      }
  })
}

export default buildReducer;
