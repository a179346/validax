import { constraintMap } from './constraintMap';

type CheckFunction = (val: any)=>boolean

export class CustomConstraint {
  /** @internal */
  public readonly error: Error;
  // /** @internal */
  public readonly checkFunction: CheckFunction;

  constructor (checkFunction: CheckFunction, error: Error) {
    this.checkFunction = checkFunction;
    this.error = error;
  }

  get Decorator (): PropertyDecorator {
    return (target: any, propertyKey: string | symbol) => {
      if (typeof propertyKey !== 'string') return;
      const className = target.constructor.name;
      if (!constraintMap[className])
        constraintMap[className] = {};
      if (!constraintMap[className][propertyKey])
        constraintMap[className][propertyKey] = [];
      constraintMap[className][propertyKey].push(this);
    };
  }
}