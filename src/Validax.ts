import { constraintMap } from './constraintMap';
import { ObjectType } from './type/ObjectType';

export class Validax {
  /** @internal */
  public static assertHelper<T extends ObjectType<any>> (input: any, schema: T, rootClassName:string, propNames:string[]): asserts input is InstanceType<T> {
    const className = schema.name;
    const validators = constraintMap[className];
    if (validators) {
      if (!input || typeof input !== 'object')
        throw new Error(rootClassName + '[' + propNames.join('][') + '] isn\'t an object');
      for (const propName in validators) {
        if (Object.prototype.hasOwnProperty.call(validators, propName)) {
          for (const constraint of validators[propName]) {
            constraint.assertFunction(input[propName], rootClassName, [ ...propNames, propName ]);
          }
        }
      }
    }
    if (Object.getPrototypeOf(schema)?.name)
      Validax.assertHelper(input, Object.getPrototypeOf(schema), rootClassName, propNames);
  }

  /**
   * assert input data match schema
   * throw an error when not match
   */
  public static assert<T extends ObjectType<any>> (input: any, schema: T): asserts input is InstanceType<T> {
    Validax.assertHelper(input, schema, schema.name, []);
  }

  /**
   * validate if input data match schema
   * return true when match
   * otherwise return false
   */
  public static validate<T extends ObjectType<any>> (input: any, schema: T): input is InstanceType<T> {
    try {
      Validax.assert(input, schema);
      return true;
    } catch (error) {
      return false;
    }
  }
}