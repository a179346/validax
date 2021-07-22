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

  const retConstraint = new CustomConstraint(function (val, className, propNames, validateOptions) {
    for (const constraint of constraints)
      constraint.assertFunction(val, className, propNames, validateOptions);
  });

  ConstraintCache.set(constraintCacheKey, retConstraint);
  return retConstraint;
}