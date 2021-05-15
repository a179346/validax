import { CustomConstraint } from './CustomConstraint';

export const constraintMap: {
  [validaxClassId: string]: {
    [propName: string]: CustomConstraint[]
  }
} = {};