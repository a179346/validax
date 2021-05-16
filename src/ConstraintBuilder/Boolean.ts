import { CustomConstraint } from '../CustomConstraint';
import { Lib } from '../Lib/Lib';

type BooleanConstraintOptions = {
  allowNull?: boolean,
  allowUndefined?: boolean,
}

export function BooleanConstraint (options?: BooleanConstraintOptions) {
  return new CustomConstraint(function (val: any, className: string, propNames: string[]) {
    const propertyPath = Lib.formatPropertyPath(className, propNames);
    if (options?.allowNull && val === null)
      return;
    if (options?.allowUndefined && val === undefined)
      return;
    if (typeof val !== 'boolean')
      throw new Error(propertyPath + ' must be a boolean');
  });
}