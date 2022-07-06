/*
boolFunc and reducerCallback are both required.
boolFunc is a function that always returns a boolean. it accepts ACTION as props (this is actually what gets returned from the action aka "payload")
it should evaluate the results of a specfic action and return whether that evaluation was true or false.

reducerCallback is a void function that has two parameters: (state, action). This function will update state. state mutation is allowed. pure functions not required.

in general a matcher works like this: if prop on action is true. update state this way.
an example of a boolFunc: 
  function isSpecial(action) {
    return action.payload.isSpecial
  }
an example of a reducerCallback:
  function reducerCallback(state, action) {
    state.isSpecial = true
  }
So if we use the build Matcher to create a matcher it should look like 
const matcher = buildMatcher({boolFunc: isSpecial, reducerCallback});
an array of these matchers is provided to the buildReducer factory.
*/
const buildMatcher = ({ boolFunc, reducerCallback}) => {
  return (boolFunc, reducerCallback);
};

export default buildMatcher;