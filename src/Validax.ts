import { ConstraintMap } from './constraintMap';
import { Lib } from './Lib/Lib';
import { ObjectType } from './type/ObjectType';

export class Validax {
  /** @internal */
  public static assertHelper<T extends ObjectType<any>> (input: any, schema: T, rootClassName:string, propNames:string[]): asserts input is InstanceType<T> {
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
        for (const propName in constraints) {
          if (Object.prototype.hasOwnProperty.call(constraints, propName)) {
            for (const constraint of constraints[propName]) {
              constraint.assertFunction(input[propName], rootClassName, [ ...propNames, propName ]);
            }
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