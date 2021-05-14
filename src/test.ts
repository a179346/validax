import { Validax, CustomConstraint, ValidaxSchema } from './index';

const StringContsraint = new CustomConstraint((val, className, propNames) => {
  if (typeof val !== 'string')
    throw new Error(className + '[' + propNames.join('][') + '] must be a string');
});

@ValidaxSchema()
class TodoList {
  @StringContsraint.Decorator
  title!: string;
}

@ValidaxSchema()
class ExtendedTodoList extends TodoList {
  @StringContsraint.Decorator
  message!: string;
}

function userInput (input: any) {
  Validax.assert(input, ExtendedTodoList);
  // input is ExtendedTodoList here ...
  input.title;
}

userInput({
  title: '123',
  message: '456',
});