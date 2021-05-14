import { CustomConstraint } from './CustomConstraint';

export const registeredValidators: {
  [className: string]: {
    [propName: string]: CustomConstraint[]
  }
} = {};