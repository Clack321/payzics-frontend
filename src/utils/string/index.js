/* eslint-disable import/no-anonymous-default-export */
import * as mutators from './mutators';
import * as validators from './validators';

export {
  mutators,
  validators,
}

export default {
  ...mutators,
  ...validators,
};