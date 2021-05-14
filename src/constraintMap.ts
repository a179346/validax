import { CustomConstraint } from './CustomConstraint';

export const constraintMap: {
  [className: string]: {
    [propName: string]: CustomConstraint[]
  }
} = {};