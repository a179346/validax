import { Validax, CustomConstraint, ValidaxSchema, ConstraintBuilder } from './index';

const StringContsraint = new CustomConstraint((val, className, propNames) => {
  if (typeof val !== 'string')
    throw new Error(className + '[' + propNames.join('][') + '] must be a string');
});
@ValidaxSchema()
class TodoListSubMetadata {
  @StringContsraint.Decorator
  subId!: string;
}

@ValidaxSchema()
class TodoListMetadata {
  @StringContsraint.Decorator
  id!: string;
  @ConstraintBuilder.Class(TodoListSubMetadata).Decorator
  submetadata!: TodoListSubMetadata;
}

@ValidaxSchema()
class TodoList {
  @StringContsraint.Decorator
  title!: string;
  @ConstraintBuilder.Class(TodoListMetadata).Decorator
  metadata!: TodoListMetadata;
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
  metadata: {
    id: '123',
    submetadata: {
      subId: '123'
    }
  }
});