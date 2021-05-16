import { CustomConstraint } from '../CustomConstraint';

export function isOneOf (availableVals: any[] | Set<any>, error: Error): CustomConstraint {
  return new CustomConstraint(function (val: any, className: string, propNames: string[]) {
    if (Array.isArray(availableVals)) {
      if (!availableVals.includes(val))
        throw error;
    }
    if (availableVals instanceof Set) {
      if (!availableVals.has(val))
        throw error;
    }
  });
}