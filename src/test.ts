import { Validax, ValidaxSchema, ConstraintBuilder } from './index';

const StringContsraint = ConstraintBuilder.String();
@ValidaxSchema()
class TodoListSubMetadata {
  @StringContsraint.Decorator()
  subId!: string;
}

@ValidaxSchema()
class TodoListMetadata {
  @StringContsraint.Decorator()
  id!: string;
  @ConstraintBuilder.Class(TodoListSubMetadata).Decorator()
  submetadata!: TodoListSubMetadata;
}

@ValidaxSchema()
class TodoList {
  @StringContsraint.Decorator()
  title!: string;
  @ConstraintBuilder.Class(TodoListMetadata).Decorator()
  metadata!: TodoListMetadata;
}

@ValidaxSchema()
class ExtendedTodoList extends TodoList {
  @StringContsraint.Decorator()
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