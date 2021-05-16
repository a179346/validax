import { CustomConstraint } from './CustomConstraint';

const constraintCache: {
  [key: string]: CustomConstraint | undefined
} = {};

function get (key: string) {
  return constraintCache[key];
}

function set (key: string, constraint: CustomConstraint) {
  constraintCache[key] = constraint;
}

export const ConstraintCache = {
  get,
  set,
};