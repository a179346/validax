import { constraintMap } from './constraintMap';

export function ValidaxSchema (): ClassDecorator {
  return function (target: any): void {
    const className = target.name;
    if (className && !constraintMap[className]) constraintMap[className] = {};
  };
}