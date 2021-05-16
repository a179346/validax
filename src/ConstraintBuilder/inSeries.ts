import { ConstraintCache } from '../ConstraintCache';
import { CustomConstraint } from '../CustomConstraint';

/**
 * make a new constraint with constraints
 * should pass all constraints (&&)
 */
export function inSeries (constraints: CustomConstraint[]): CustomConstraint {
  const constraintCacheKey = JSON.stringify({
    type: 'inSeries',
    opt: {
      constraintIds: constraints.map((c) => c.constraintId),
    }
  });
  const cacheValue = ConstraintCache.get(constraintCacheKey);
  if (cacheValue) return cacheValue;

  const assertFunction = function (val: any, className: string, propNames: string[]) {
    for (const constraint of constraints)
      constraint.assertFunction(val, className, propNames);
  };
  const retConstraint = new CustomConstraint(assertFunction);

  ConstraintCache.set(constraintCacheKey, retConstraint);
  return retConstraint;
}