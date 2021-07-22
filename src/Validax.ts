import { ConstraintMap } from './constraintMap';
import { Lib } from './Lib/Lib';
import { ObjectType } from './type/ObjectType';

export interface validateOptions {
  // not allow other keys
  strict?: boolean;
}

export class Validax {
  /** @internal */
  public static assertHelper<T extends ObjectType<any>> (input: any, schema: T, rootClassName:string, propNames:string[], validateOptions?: validateOptions): asserts input is InstanceType<T> {
    const validaxClassId = schema.validaxClassId;
    if (typeof validaxClassId === 'number') {
      const classConstraintMap = ConstraintMap.getClassConstraintMap(validaxClassId.toString());
      if (classConstraintMap) {
        if (!input || typeof input !== 'object') {
          const errorWhenNotObject = classConstraintMap.getErrorWhenNotObject();
          if (errorWhenNotObject)
            throw errorWhenNotObject;
          throw new Error(Lib.formatPropertyPath(rootClassName, propNames) + ' isn\'t an object');
        }
        const constraints = classConstraintMap.getConstraints();
        if (validateOptions?.strict) {
          for (const propName in input) {
            if (Object.prototype.hasOwnProperty.call(input, propName)) {
              if (!Object.prototype.hasOwnProperty.call(constraints, propName)) {
                const errorWhenNotObject = classConstraintMap.getErrorWhenNotObject();
                if (errorWhenNotObject)
                  throw errorWhenNotObject;
                throw new Error(Lib.formatPropertyPath(rootClassName, [ ...propNames, propName ]) + ' isn\'t a valid parameter.');
              }
            }
          }
        }
        for (const propName in constraints) {
          if (Object.prototype.hasOwnProperty.call(constraints, propName)) {
            for (const constraint of constraints[propName]) {
              constraint.assertFunction(input[propName], rootClassName, [ ...propNames, propName ], validateOptions);
            }
          }
        }
      }
    }
    if (Object.getPrototypeOf(schema)?.name)
      Validax.assertHelper(input, Object.getPrototypeOf(schema), rootClassName, propNames, validateOptions);
  }

  /**
   * assert input data match schema
   * throw an error when not match
   */
  public static assert<T extends ObjectType<any>> (input: any, schema: T, validateOptions?: validateOptions): asserts input is InstanceType<T> {
    Validax.assertHelper(input, schema, schema.name, [], validateOptions);
  }

  /**
   * validate if input data match schema
   * return true when match
   * otherwise return false
   */
  public static validate<T extends ObjectType<any>> (input: any, schema: T, validateOptions?: validateOptions): input is InstanceType<T> {
    try {
      Validax.assert(input, schema, validateOptions);
      return true;
    } catch (error) {
      return false;
    }
  }
}