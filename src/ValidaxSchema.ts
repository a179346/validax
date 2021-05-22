import { ConstraintMap } from './constraintMap';
import { Lib } from './Lib/Lib';

export function ValidaxSchema (errorWhenNotObject?: Error): ClassDecorator {
  return function (target: any): void {
    Lib.checkValidaxClassId(target);
    const validaxClassId = target.validaxClassId;
    ConstraintMap.checkValidaxClassId(validaxClassId);
    if (errorWhenNotObject)
      ConstraintMap.setErrorWhenNotObject(validaxClassId, errorWhenNotObject);
  };
}