import { CustomConstraint } from '../CustomConstraint';

/**
 * make a new constraint with constraints
 * should pass all constraints (&&)
 */
export function inSeries (...constraints: CustomConstraint[]) {
  const assertFunction = function (val: any, className: string, propNames: string[]) {
    for (const constraint of constraints)
      constraint.assertFunction(val, className, propNames);
  };
  return new CustomConstraint(assertFunction);
}