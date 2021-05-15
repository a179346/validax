import { CustomConstraint } from '../CustomConstraint';

/**
 * make a new constraint with constraints
 * should pass one of the constraints (||)
 */
export function inParallel (error: Error, ...constraints: CustomConstraint[]) {
  const assertFunction = function (val: any, className: string, propNames: string[]) {
    for (const constraint of constraints) {
      try {
        constraint.assertFunction(val, className, propNames);
        return;
      } catch (error) {
        //
      }
    }
    throw error;
  };
  return new CustomConstraint(assertFunction);
}