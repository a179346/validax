import { ConstraintCache } from '../ConstraintCache';
import { CustomConstraint } from '../CustomConstraint';
import { Lib } from '../Lib/Lib';

type StringConstraintOptions = {
  allowNull?: boolean,
  allowUndefined?: boolean,
  maxLength?: number,
  minLength?: number,
  regex?: RegExp,
}

export function StringConstraint (options?: StringConstraintOptions): CustomConstraint {
  const constraintCacheKey = JSON.stringify({
    type: 'String',
    opt: {
      allowNull: options?.allowNull || undefined,
      allowUndefined: options?.allowUndefined || undefined,
      maxLength: typeof (options?.maxLength) === 'number' ? options.maxLength : undefined,
      minLength: typeof (options?.minLength) === 'number' ? options.minLength : undefined,
      regex: (options?.regex) ? options.regex.toString() : undefined,
    }
  });
  const cacheValue = ConstraintCache.get(constraintCacheKey);
  if (cacheValue) return cacheValue;

  const retConstraint = new CustomConstraint(function (val: any, className: string, propNames: string[]) {
    const propertyPath = Lib.formatPropertyPath(className, propNames);
    if (options?.allowNull && val === null)
      return;
    if (options?.allowUndefined && val === undefined)
      return;
    if (typeof val !== 'string')
      throw new Error(propertyPath + ' must be a string');
    if (typeof (options?.maxLength) === 'number') {
      if (val.length > options.maxLength)
        throw new Error(propertyPath + ' not match maxLength:' + options.maxLength);
    }
    if (typeof (options?.minLength) === 'number') {
      if (val.length < options.minLength)
        throw new Error(propertyPath + ' not match minLength:' + options.minLength);
    }
    if (options?.regex) {
      if (!options.regex.test(val))
        throw new Error(propertyPath + ' not match regex:' + options.regex.toString());
    }
  });

  ConstraintCache.set(constraintCacheKey, retConstraint);
  return retConstraint;
}