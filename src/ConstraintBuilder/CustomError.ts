import { CustomConstraint } from '../CustomConstraint';

export function CustomError (constraint: CustomConstraint, error: Error) {
  const assertFunction = function (val: any, className: string, propNames: string[]) {
    try {
      constraint.assertFunction(val, className, propNames);
    } catch (err) {
      throw error;
    }
  };
  return new CustomConstraint(assertFunction);
}