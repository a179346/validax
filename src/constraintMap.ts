import { CustomConstraint } from './CustomConstraint';

class ClassConstraintMap {
  private errorWhenNotObject?: Error;
  private constraints: {
    [propName: string]: CustomConstraint[]
  } = {};

  public addConstraint (propName: string, constraint: CustomConstraint) {
    if (!this.constraints[propName])
      this.constraints[propName] = [];

    this.constraints[propName].push(constraint);
  }

  public setErrorWhenNotObject (error: Error) {
    this.errorWhenNotObject = error;
  }

  public getErrorWhenNotObject () {
    return this.errorWhenNotObject;
  }

  public getConstraints () {
    return this.constraints;
  }
}

class ConstraintMap {
  private constraintMap: {
    [validaxClassId: string]: ClassConstraintMap
  } = {};

  public checkValidaxClassId (validaxClassId: string) {
    if (!this.constraintMap[validaxClassId])
      this.constraintMap[validaxClassId] = new ClassConstraintMap();
  }

  public addConstraint (validaxClassId: string, propName: string, constraint: CustomConstraint) {
    this.checkValidaxClassId(validaxClassId);
    this.constraintMap[validaxClassId].addConstraint(propName, constraint);
  }

  public setErrorWhenNotObject (validaxClassId:string, error: Error) {
    this.checkValidaxClassId(validaxClassId);
    this.constraintMap[validaxClassId].setErrorWhenNotObject(error);
  }

  public getClassConstraintMap (validaxClassId: string) {
    return this.constraintMap[validaxClassId];
  }
}

const constraintMap = new ConstraintMap() as ConstraintMap;
export {
  constraintMap as ConstraintMap
};