import { constraintMap } from './constraintMap';
import { Lib } from './Lib/Lib';

export function ValidaxSchema (): ClassDecorator {
  return function (target: any): void {
    Lib.checkValidaxClassId(target);
    const validaxClassId = target.validaxClassId;
    if (validaxClassId && !constraintMap[validaxClassId]) constraintMap[validaxClassId] = {};
  };
}