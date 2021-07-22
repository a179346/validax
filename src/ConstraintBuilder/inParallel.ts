import { CustomConstraint } from '../CustomConstraint';

/**
 * make a new constraint with constraints
 * should pass one of the constraints (||)
 */
export function inParallel (constraints: CustomConstraint[], error: Error): CustomConstraint {
  return new CustomConstraint(function (val, className, propNames, validateOptions) {
    for (const constraint of constraints) {
      try {
        constraint.assertFunction(val, className, propNames, validateOptions);
        return;
      } catch (error) {
        //
      }
    }
    throw error;
  });
}