import { CustomConstraint } from '../CustomConstraint';
import { Lib } from '../Lib/Lib';

type ArrayOfConstraintOptions = {
  allowNull?: boolean,
  allowUndefined?: boolean,
  maxLength?: number,
  minLength?: number,
}

export function ArrayOf (constraint: CustomConstraint, options?: ArrayOfConstraintOptions): CustomConstraint {
  return new CustomConstraint(function (val: any, className: string, propNames: string[]) {
    const propertyPath = Lib.formatPropertyPath(className, propNames);
    if (options?.allowNull && val === null)
      return;
    if (options?.allowUndefined && val === undefined)
      return;
    if (!Array.isArray(val))
      throw new Error(propertyPath + ' must be an array');
    if (typeof (options?.maxLength) === 'number') {
      if (val.length > options.maxLength)
        throw new Error(propertyPath + ' not match maxLength:' + options.maxLength);
    }
    if (typeof (options?.minLength) === 'number') {
      if (val.length < options.minLength)
        throw new Error(propertyPath + ' not match minLength:' + options.minLength);
    }
    for (let i = 0;i < val.length;i++) {
      constraint.assertFunction(val[i], className, [ ...propNames, i.toString() ]);
    }
  });
}