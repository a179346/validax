import { Validax, CustomConstraint, ValidaxSchema } from './index';

@ValidaxSchema()
class TodoList {
  @new CustomConstraint((val) => typeof val === 'string', new Error('title isn\'t a string.')).Decorator
  title!: string;
}

@ValidaxSchema()
class ExtendedTodoList extends TodoList {
  @new CustomConstraint((val) => typeof val === 'string', new Error('message isn\'t a string.')).Decorator
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