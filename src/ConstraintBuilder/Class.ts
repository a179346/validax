import { CustomConstraint } from '../CustomConstraint';
import { ObjectType } from '../type/ObjectType';
import { Validax } from '../Validax';

type ClassConstraintOptions = {
  allowNull?: boolean,
  allowUndefined?: boolean,
}

export function ClassConstraint<T extends ObjectType<any>> (schema: T, options?: ClassConstraintOptions) {
  return new CustomConstraint(function (val: any, className: string, propNames: string[]) {
    if (options?.allowNull && val === null)
      return;
    if (options?.allowUndefined && val === undefined)
      return;
    Validax.assertHelper(val, schema, className, propNames);
  });
}