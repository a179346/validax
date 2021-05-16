import { CustomConstraint } from '../CustomConstraint';
import { Lib } from '../Lib/Lib';

type NumberConstraintOptions = {
  allowNull?: boolean,
  allowUndefined?: boolean,
  allowNaN?: boolean,
  isFinite?: boolean,
  isInterger?: boolean,
  max?: number,
  min?: number,
}

export function NumberConstraint (options?: NumberConstraintOptions) {
  return new CustomConstraint(function (val: any, className: string, propNames: string[]) {
    const propertyPath = Lib.formatPropertyPath(className, propNames);
    if (options?.allowNull && val === null)
      return;
    if (options?.allowUndefined && val === undefined)
      return;
    if (options?.allowNaN && isNaN(val))
      return;
    if (typeof val !== 'number')
      throw new Error(propertyPath + ' must be a number');
    if (options?.isFinite && !Number.isFinite(val))
      throw new Error(propertyPath + ' isn\'t finite.');
    if (options?.isInterger && !Number.isInteger(val))
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
}