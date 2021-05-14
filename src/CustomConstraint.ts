import { registeredValidators } from './registeredValidators';

type CheckFunction = (val: any)=>boolean

export class CustomConstraint {
  /** @internal */
  public error: Error;
  /** @internal */
  public checkFunction: CheckFunction;

  constructor (checkFunction: CheckFunction, error: Error) {
    this.checkFunction = checkFunction;
    this.error = error;
  }

  get Decorator (): PropertyDecorator {
    return (target: any, propertyKey: string | symbol) => {
      if (typeof propertyKey !== 'string') return;
      const className = target.constructor.name;
      if (!registeredValidators[className])
        registeredValidators[className] = {};
      if (!registeredValidators[className][propertyKey])
        registeredValidators[className][propertyKey] = [];
      registeredValidators[className][propertyKey].push(this);
    };
  }
}