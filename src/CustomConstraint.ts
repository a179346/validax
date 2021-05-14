import { constraintMap } from './constraintMap';

type AssertFunction = (val: any, className: string, propNames: string[])=> void | never

export class CustomConstraint {
  public readonly assertFunction: AssertFunction;

  constructor (assertFunction: AssertFunction) {
    this.assertFunction = assertFunction;
  }

  get Decorator (): PropertyDecorator {
    return (target: any, propName: string | symbol) => {
      if (typeof propName !== 'string') return;
      const className = target.constructor.name;
      if (!constraintMap[className])
        constraintMap[className] = {};
      if (!constraintMap[className][propName])
        constraintMap[className][propName] = [];
      constraintMap[className][propName].push(this);
    };
  }
}