import { constraintMap } from './constraintMap';

type ObjectType<T> = {
  new (...args: any[]): T;
}

export class Validax {
  private static assertHelper<T extends ObjectType<any>> (input: any, schema: T, rootClassName:string): asserts input is InstanceType<T> {
    const className = schema.name;
    const validators = constraintMap[className];
    if (validators) {
      if (!input || typeof input !== 'object')
        throw new Error('input isn\'t an object');
      for (const propName in validators) {
        if (Object.prototype.hasOwnProperty.call(validators, propName)) {
          for (const constraint of validators[propName]) {
            constraint.assertFunction(input[propName], rootClassName, [ propName ]);
          }
        }
      }
    }
    if (Object.getPrototypeOf(schema)?.name)
      Validax.assertHelper(input, Object.getPrototypeOf(schema), rootClassName);
  }

  public static assert<T extends ObjectType<any>> (input: any, schema: T): asserts input is InstanceType<T> {
    Validax.assertHelper(input, schema, schema.name);
  }

  public static validate<T extends ObjectType<any>> (input: any, schema: T): input is InstanceType<T> {
    try {
      Validax.assert(input, schema);
      return true;
    } catch (error) {
      return false;
    }
  }
}