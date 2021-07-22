import { CustomConstraint } from '../CustomConstraint';

export function CustomError (constraint: CustomConstraint, error: Error): CustomConstraint {
  return new CustomConstraint(function (val, className, propNames, validateOptions) {
    try {
      constraint.assertFunction(val, className, propNames, validateOptions);
    } catch (err) {
      throw error;
    }
  });
}