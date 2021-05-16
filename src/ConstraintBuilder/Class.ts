import { ConstraintCache } from '../ConstraintCache';
import { CustomConstraint } from '../CustomConstraint';
import { Lib } from '../Lib/Lib';
import { ObjectType } from '../type/ObjectType';
import { Validax } from '../Validax';

type ClassConstraintOptions = {
  allowNull?: boolean,
  allowUndefined?: boolean,
}

export function ClassConstraint<T extends ObjectType<any>> (schema: T, options?: ClassConstraintOptions): CustomConstraint {
  Lib.checkValidaxClassId(schema);
  const constraintCacheKey = JSON.stringify({
    type: 'Class',
    opt: {
      valiaxClassId: schema.validaxClassId,
      allowNull: options?.allowNull || undefined,
      allowUndefined: options?.allowUndefined || undefined,
    }
  });
  const cacheValue = ConstraintCache.get(constraintCacheKey);
  if (cacheValue) return cacheValue;

  const retConstraint =  new CustomConstraint(function (val: any, className: string, propNames: string[]) {
    if (options?.allowNull && val === null)
      return;
    if (options?.allowUndefined && val === undefined)
      return;
    Validax.assertHelper(val, schema, className, propNames);
  });

  ConstraintCache.set(constraintCacheKey, retConstraint);
  return retConstraint;
}