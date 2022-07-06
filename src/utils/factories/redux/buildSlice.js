import { createSlice } from '@reduxjs/toolkit';
import {HYDRATE} from 'next-redux-wrapper';
//"slice" is the top level description. Ex: "system"

/*
"initialState" is an object with what this slices store is supposed to contain. 
initialState passed into buildReducer SHOULD ALWAYS be constant javascript object with only constants. (aka no requests or functions to update vars)
*/

/*"cases" is the action string as the key and the callback that accepts state, and action
/cases" should look like this: 
const cases = { 

  increment: (state, action) => {
    const { payload } = action;
    state.counter += 1;
  }

  decrement: (state, action) => {
    const { payload } = action;
    state.counter -= 1;
  }

  ...etc
}
  notice how each function is a NOT a pure function (meaning that it can directly mutate state).
  For this reason it is recomended you build both your actions and and reducers with build slice.

  "extraReducers" is NOT required. However, there is a caveat. 
  in order for extraReducers to work correctly all of the reducer callbacks must be pure functions (as explained in the documentation of buildReducer)
  since pure functions cannot mutate state directly, you must make a passByReference copy of the state object, update that. then return the copy. 
  It is for this reason that it is recommended to use the buildReducer factory util. THEN pass THAT value to the buildSlice factory function as the extraReducers prop.

  remember, when using buildSlice you're creating both the reducers and actions at the same time. 
  so in this case if you need to have a prepare function for any of your actions it MUST be provided in a specific format
  instead of the normal case object (key:value) a case object with a prepare callback is defined as so:
      {
        actionStr: reducerCallback <--- No prepare callback
        actionString: { reducer: reducerCallback, prepare: prepareCallback}, <--- Has prepare callback
      }
  for an example please pay attention to the decrementWithPrepare method on the cases object.

  const cases = { 

  increment: (state, action) => {
    const { payload } = action;
    state.counter += 1;
  }
  
  decrement: (state, action) => {
    const { payload } = action;
    state.counter -= 1;
  }

  *------> decrementWithPrepare: {
  *------> reducer: (state, action) => {
      const { counter } = action;
      state.counter = counter;
    },
  *------> prepare: (num) => {
      return { payload: { counter: num - 1 } }
    },
  },
}

buildSlice returns: {
  name,
  reducer,
  actions,
  caseReducer,
}
*/
const buildSlice = ({ slice, initialState, cases, extraReducers }) => {
  let sliceObj = {
    name: slice,
    initialState,
    reducers: cases,
    extraReducers: {
      [HYDRATE]: (state, action) => {
          return {
              ...state,
              ...action.payload.subject,
          };
      },
  },
  };
  if (extraReducers) {
    sliceObj.extraReducers = extraReducers;
  }
  return createSlice(sliceObj);
}

export default buildSlice;
