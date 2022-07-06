/* eslint-disable import/no-anonymous-default-export */
import * as factories from './factories';
import * as string from './string';

export {
  factories,
  string,
}

export default {
  ...factories,
  ...string,
};