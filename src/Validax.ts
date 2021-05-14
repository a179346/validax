import { constraintMap } from './constraintMap';

type ObjectType<T> = {
  new (...args: any[]): T;
}

export class Validax {
  static assert<T extends ObjectType<any>> (input: any, schema: T): asserts input is InstanceType<T> {
    const className = schema.name;
    const validators = constraintMap[className];
    if (validators) {
      if (!input || typeof input !== 'object')
        throw new Error('input isn\'t an object');
      for (const propName in validators) {
        if (Object.prototype.hasOwnProperty.call(validators, propName)) {
          for (const constraint of validators[propName]) {
            if (!constraint.checkFunction(input[propName]))
              throw constraint.error;
          }
        }
      }
    }
    if (Object.getPrototypeOf(schema)?.name)
      Validax.assert(input, Object.getPrototypeOf(schema));
  }

  static validate<T extends ObjectType<any>> (input: any, schema: T): input is InstanceType<T> {
    try {
      Validax.assert(input, schema);
      return true;
    } catch (error) {
      return false;
    }
  }
}