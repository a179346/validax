import { Validax, CustomConstraint, ValidaxSchema } from './index';

@ValidaxSchema()
class TodoList {
  @new CustomConstraint((val) => typeof val === 'string', new Error('title isn\'t a string.')).Decorator
  title!: string;
}

function userInput (input: any) {
  if (Validax.validate(input, TodoList)) {
    // input is TodoList here ...
    input.title;
  }
}

userInput({
  title: '123'
});