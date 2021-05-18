import { ObjectType } from '../type/ObjectType';

function formatPropertyPath (rootClassName:string, propNames:string[]) {
  if (propNames.length > 0)
    return rootClassName + '[' + propNames.join('][') + ']';
  return rootClassName;
}

let classIdCounter = 0;
const classMap = new WeakSet();
function checkValidaxClassId (classConstructor: ObjectType<any>) {
  if (!classMap.has(classConstructor)) {
    classMap.add(classConstructor);
    classIdCounter += 1;
    classConstructor.validaxClassId = classIdCounter;
  }
}

export const Lib = {
  formatPropertyPath,
  checkValidaxClassId,
};