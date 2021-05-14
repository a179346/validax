import { registeredValidators } from './registeredValidators';

export function ValidaxSchema (): ClassDecorator {
  return function (target: any): void {
    const className = target.name;
    if (className && !registeredValidators[className]) registeredValidators[className] = {};
  };
}