import { ConstraintMap } from './constraintMap';
import { Lib } from './Lib/Lib';

let constraintIdCounter = 0;

/**
 * return void when type check is pass
 * throw error when type check is failed
 */
type AssertFunction = (val: any, className: string, propNames: string[])=> void | never

export class CustomConstraint {
  public readonly constraintId: number;
  public readonly assertFunction: AssertFunction;
  /**
   * make a custom constraint
   */
  constructor (assertFunction: AssertFunction) {
    constraintIdCounter += 1;
    this.constraintId = constraintIdCounter;
    this.assertFunction = assertFunction;
  }

  Decorator (): PropertyDecorator {
    return (target: any, propName: string | symbol) => {
      if (typeof propName !== 'string') return;
      Lib.checkValidaxClassId(target.constructor);
      const validaxClassId = target.constructor.validaxClassId;
      ConstraintMap.addConstraint(validaxClassId, propName, this);
    };
  }
}