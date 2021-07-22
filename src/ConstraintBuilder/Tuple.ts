import { ConstraintCache } from '../ConstraintCache';
import { CustomConstraint } from '../CustomConstraint';
import { Lib } from '../Lib/Lib';

type TupleConstraintOptions = {
  allowNull?: boolean,
  allowUndefined?: boolean,
  allowExtraDataLength?: boolean,
}

export function Tuple (constraints: CustomConstraint[], options?: TupleConstraintOptions): CustomConstraint {
  const constraintCacheKey = JSON.stringify({
    type: 'Tuple',
    opt: {
      constraintIds: constraints.map((c) => c.constraintId),
      allowNull: options?.allowNull || undefined,
      allowUndefined: options?.allowUndefined || undefined,
      allowExtraDataLength: options?.allowExtraDataLength || undefined,
    }
  });
  const cacheValue = ConstraintCache.get(constraintCacheKey);
  if (cacheValue) return cacheValue;

  const retConstraint = new CustomConstraint(function (val, className, propNames, validateOptions) {
    const propertyPath = Lib.formatPropertyPath(className, propNames);
    if (options?.allowNull && val === null)
      return;
    if (options?.allowUndefined && val === undefined)
      return;
    if (!Array.isArray(val))
      throw new Error(propertyPath + ' must be an array');
    if (!options?.allowExtraDataLength && val.length > constraints.length)
      throw new Error(propertyPath + '.length is more than constraints.length');
    for (let i = 0;i < constraints.length;i++) {
      constraints[i].assertFunction(val[i], className, [ ...propNames, i.toString() ], validateOptions);
    }
  });

  ConstraintCache.set(constraintCacheKey, retConstraint);
  return retConstraint;
}