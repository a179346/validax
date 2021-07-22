import { ConstraintCache } from '../ConstraintCache';
import { CustomConstraint } from '../CustomConstraint';
import { Lib } from '../Lib/Lib';

type NumberConstraintOptions = {
  allowNull?: boolean,
  allowUndefined?: boolean,
  allowNaN?: boolean,
  isFinite?: boolean,
  isInteger?: boolean,
  max?: number,
  min?: number,
}

export function NumberConstraint (options?: NumberConstraintOptions): CustomConstraint {
  const constraintCacheKey = JSON.stringify({
    type: 'Number',
    opt: {
      allowNull: options?.allowNull || undefined,
      allowUndefined: options?.allowUndefined || undefined,
      allowNaN: options?.allowNaN || undefined,
      isFinite: options?.isFinite || undefined,
      isInteger: options?.isInteger || undefined,
      max: typeof (options?.max) === 'number' ? options.max : undefined,
      min: typeof (options?.min) === 'number' ? options.min : undefined,
    }
  });
  const cacheValue = ConstraintCache.get(constraintCacheKey);
  if (cacheValue) return cacheValue;

  const retConstraint = new CustomConstraint(function (val, className, propNames) {
    const propertyPath = Lib.formatPropertyPath(className, propNames);
    if (options?.allowNull && val === null)
      return;
    if (options?.allowUndefined && val === undefined)
      return;
    if (options?.allowNaN && isNaN(val) && typeof val === 'number')
      return;
    if (isNaN(val) || typeof val !== 'number')
      throw new Error(propertyPath + ' must be a number');
    if (options?.isFinite && !Number.isFinite(val))
      throw new Error(propertyPath + ' isn\'t finite.');
    if (options?.isInteger && !Number.isInteger(val))
      throw new Error(propertyPath + ' must be an integer');
    if (typeof (options?.max) === 'number') {
      if (val > options.max)
        throw new Error(propertyPath + ' not match max:' + options.max);
    }
    if (typeof (options?.min) === 'number') {
      if (val < options.min)
        throw new Error(propertyPath + ' not match min:' + options.min);
    }
  });

  ConstraintCache.set(constraintCacheKey, retConstraint);
  return retConstraint;
}