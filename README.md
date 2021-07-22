<div align="center">
<h1 align="center"> ⭕ Validax ⭕</h1>

<p>
  <a href="https://github.com/a179346/validax/actions/workflows/test.yml" target="_blank">
    <img alt="Documentation" src="https://github.com/a179346/validax/actions/workflows/test.yml/badge.svg" />
  </a>
  <a href="https://travis-ci.org/a179346/validax" target="_blank">
    <img alt="Documentation" src="https://travis-ci.org/a179346/validax.svg?branch=main" />
  </a>
  <a href="https://www.npmjs.com/package/validax" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/npm/v/validax?maxAge=3600)" />
  </a>
  <a href="https://github.com/a179346/validax#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/a179346/validax/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/a179346/validax/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/a179346/validax" />
  </a>
</p>
</div>

> A clean way to validate JSON schema in Typescript

# Bookmark

- [Bookmark](#bookmark)
- [What is validax](#what-is-validax)
- [Installation](#installation)
- [Validax](#validax)
  - [assert](#assert)
  - [validate](#validate)
- [ConstraintBuilder](#constraintbuilder)
  - [String](#string)
  - [Number](#number)
  - [Boolean](#boolean)
  - [Class](#class)
  - [CustomError](#customerror)
  - [inParallel](#inparallel)
  - [inSeries](#inseries)
  - [isOneOf](#isoneof)
  - [ArrayOf](#arrayof)
  - [Tuple](#tuple)
- [CustomConstraint](#customconstraint)
- [validateOptions](#validateoptions)
- [Common issues](#common-issues)
    - [1. Experimental support for decorators is a feature that is subject to change in a future release.](#1-experimental-support-for-decorators-is-a-feature-that-is-subject-to-change-in-a-future-release)
    - [2. How to validate a nested object](#2-how-to-validate-a-nested-object)
# What is validax
A clean way to validate JSON schema in Typescript

```ts
import { Validax, ValidaxSchema, ConstraintBuilder } from 'validax';

@ValidaxSchema()
class Person {
  @ConstraintBuilder.Number().Decorator()
  id!: number;
  @ConstraintBuilder.String().Decorator()
  name!: string;
}

function userInput (input: any) {
  Validax.assert(input, Person);
  // input is Person here ...
}

userInput({
  id: 123,
  name: 'John',
});
```

# Installation
```bash
npm install validax
```

# Validax
## assert

> `Validax.assert(input, schema[, validateOptions])` -> `asserts input is schema`
 
assert input data match schema

reference: [validateOptions](#validateoptions)

```ts
import { Validax, ValidaxSchema, ConstraintBuilder } from 'validax';

@ValidaxSchema()
class Person {
  @ConstraintBuilder.String().Decorator()
  name!: string;
}

function userInput (input: any) {
  try {
    Validax.assert(input, Person);
    // input is Person here ...
  } catch (error) {
    // input is not Person
  }
}
```
## validate

> `Validax.validate(input, schema[, validateOptions])` -> `input is schema`
 
validate input data is schema

reference: [validateOptions](#validateoptions)

```ts
import { Validax, ValidaxSchema, ConstraintBuilder } from 'validax';

@ValidaxSchema()
class Person {
  @ConstraintBuilder.String().Decorator()
  name!: string;
}

function userInput (input: any) {
  if (Validax.validate(input, Person)) {
    // input is Person here ...
  }
}
```

# ConstraintBuilder
## String

> `ConstraintBuilder.String(options)` -> `CustomConstraint`
 
return a CustomConstraint to validate string value
```ts
import { ValidaxSchema, ConstraintBuilder } from 'validax';

@ValidaxSchema()
class Person {
  @ConstraintBuilder.String().Decorator()
  name!: string;
}
```
options<br>
*Optional*  
Type: `StringConstraintOptions`   
```ts
type StringConstraintOptions = {
  allowNull?: boolean,
  allowUndefined?: boolean,
  maxLength?: number,
  minLength?: number,
  regex?: RegExp,
}
```
## Number

> `ConstraintBuilder.Number(options)` -> `CustomConstraint`
 
return a CustomConstraint to validate number value
```ts
import { ValidaxSchema, ConstraintBuilder } from 'validax';

@ValidaxSchema()
class Person {
  @ConstraintBuilder.Number({ isInteger: true }).Decorator()
  id!: number;
}
```
options<br>
*Optional*  
Type: `NumberConstraintOptions`   
```ts
type NumberConstraintOptions = {
  allowNull?: boolean,
  allowUndefined?: boolean,
  allowNaN?: boolean,
  isFinite?: boolean,
  isInteger?: boolean,
  max?: number,
  min?: number,
}
```
## Boolean

> `ConstraintBuilder.Boolean(options)` -> `CustomConstraint`
 
return a CustomConstraint to validate boolean value
```ts
import { ValidaxSchema, ConstraintBuilder } from 'validax';

@ValidaxSchema()
class Person {
  @ConstraintBuilder.Boolean().Decorator()
  isVerifiedEmail!: boolean;
}
```
options<br>
*Optional*  
Type: `BooleanConstraintOptions`   
```ts
type BooleanConstraintOptions = {
  allowNull?: boolean,
  allowUndefined?: boolean,
}
```
## Class

> `ConstraintBuilder.Class(schema, options)` -> `CustomConstraint`
 
return a CustomConstraint to validate object
```ts
import { ValidaxSchema, ConstraintBuilder } from 'validax';

@ValidaxSchema()
class Person {
  @ConstraintBuilder.String().Decorator()
  name!: string;

  @ConstraintBuilder.Class(Person, { allowNull: true }).Decorator()
  father: Person | null;
}
```
options<br>
*Optional*  
Type: `ClassConstraintOptions`   
```ts
type ClassConstraintOptions = {
  allowNull?: boolean,
  allowUndefined?: boolean,
}
```
## CustomError

> `ConstraintBuilder.CustomError(constraint, error)` -> `CustomConstraint`
 
return a CustomConstraint throw a custom error when validate property failed
```ts
import { ValidaxSchema, ConstraintBuilder } from 'validax';

@ValidaxSchema()
class Person {
  @ConstraintBuilder.CustomError(
    ConstraintBuilder.String(),
    new Error('name is invalid.')
  ).Decorator()
  name!: string;
}
```
## inParallel

> `ConstraintBuilder.inParallel(constraints, error)` -> `CustomConstraint`
 
return a CustomConstraint with constraints<br>
should pass one of the constraints ( || )
```ts
import { ValidaxSchema, ConstraintBuilder } from 'validax';

@ValidaxSchema()
class Person {
  @ConstraintBuilder.inParallel([
    ConstraintBuilder.String(),
    ConstraintBuilder.Number()
  ], new Error('id is invalid.')).Decorator()
  id!: string | number;
}
```
## inSeries

> `ConstraintBuilder.inSeries(constraints)` -> `CustomConstraint`
 
return a CustomConstraint with constraints<br>
should pass all constraints ( && )
```ts
import { ValidaxSchema, ConstraintBuilder } from 'validax';

@ValidaxSchema()
class Person {
  @ConstraintBuilder.inSeries([
    ConstraintBuilder.isOneOf([ 1, 2, 3 ], new Error('id is invalid')),
    ConstraintBuilder.isOneOf([ 2, 3, 4 ], new Error('id is invalid')),
  ]).Decorator()
  id!: 2 | 3;
}
```
## isOneOf

> `ConstraintBuilder.isOneOf(availableVals, error)` -> `CustomConstraint`
 
return a CustomConstraint that check property is one of the available values
```ts
import { ValidaxSchema, ConstraintBuilder } from 'validax';

@ValidaxSchema()
class Person {
  @ConstraintBuilder.isOneOf([ 1, 2, 3 ], new Error('id is invalid')).Decorator()
  id!: 1 | 2 | 3;
}
```
## ArrayOf

> `ConstraintBuilder.ArrayOf(constraint, options)` -> `CustomConstraint`
 
return a CustomConstraint that check property is an array of specific type
```ts
import { ValidaxSchema, ConstraintBuilder } from 'validax';

@ValidaxSchema()
class Person {
  @ConstraintBuilder.ArrayOf(ConstraintBuilder.Number()).Decorator()
  id!: number[];
}
```
options<br>
*Optional*  
Type: `ArrayOfConstraintOptions`   
```ts
type ArrayOfConstraintOptions = {
  allowNull?: boolean,
  allowUndefined?: boolean,
  maxLength?: number,
  minLength?: number,
}
```
## Tuple

> `ConstraintBuilder.Tuple(constraints, options)` -> `CustomConstraint`
 
return a CustomConstraint that check tuple value
```ts
import { ValidaxSchema, ConstraintBuilder } from 'validax';

@ValidaxSchema()
class Person {
  @ConstraintBuilder.Tuple([
    ConstraintBuilder.Number(),
    ConstraintBuilder.String(),
  ]).Decorator()
  id!: [number, string];
}
```
options<br>
*Optional*  
Type: `TupleConstraintOptions`   
```ts
type TupleConstraintOptions = {
  allowNull?: boolean,
  allowUndefined?: boolean,
  allowExtraDataLength?: boolean,
}
```
# CustomConstraint

> `new CustomConstraint(assertFunction)` -> `CustomConstraint`
```ts
import { ValidaxSchema, CustomConstraint } from 'validax';

@ValidaxSchema()
class Person {
  @new CustomConstraint((val) => {
    if (!val || typeof val !== 'object')
      throw new Error('foo is not an object');
    if (typeof val.bar !== 'string')
      throw new Error('foo.bar is not a string');
    if (typeof val.bar2 !== 'number')
      throw new Error('foo.bar2 is not a number');
  }).Decorator()
  foo!: {
    bar: string;
    bar2: number;
  };
}
```
assertFunction<br>
*Required*  
Type: `AssertFunction`  
```ts
/**
 * return void when type check is pass
 * throw error when type check is failed
 */
type AssertFunction = (val: any, className: string, propNames: string[], validateOptions?: validateOptions)=> void | never
```

# validateOptions

```ts
interface validateOptions {
  // not allow other keys in object if true
  strict?: boolean;
}
```

# Common issues

### 1. Experimental support for decorators is a feature that is subject to change in a future release.
> In `tsconfig.json`
> ```ts
> "emitDecoratorMetadata": true,
> "experimentalDecorators": true,
> ```

### 2. How to validate a nested object
> [(1) ConstraintBuilder.Class](#class)
> ```ts
> import { ValidaxSchema, ConstraintBuilder } from 'validax';
> 
> @ValidaxSchema()
> class Foo {
>   @ConstraintBuilder.String().Decorator()
>   bar!: string;
>   @ConstraintBuilder.Number().Decorator()
>   bar2!: number;
> }
> 
> @ValidaxSchema()
> class Person {
>   @ConstraintBuilder.Class(Foo).Decorator()
>   foo!: Foo;
> }
> ```

> [(2) CustomConstraint](#customconstraint)
> ```ts
> import { ValidaxSchema, CustomConstraint } from 'validax';
> 
> @ValidaxSchema()
> class Person {
>   @new CustomConstraint((val) => {
>     if (!val || typeof val !== 'object')
>       throw new Error('foo is not an object');
>     if (typeof val.bar !== 'string')
>       throw new Error('foo.bar is not a string');
>     if (typeof val.bar2 !== 'number')
>       throw new Error('foo.bar2 is not a number');
>   }).Decorator()
>   foo!: {
>     bar: string;
>     bar2: number;
>   };
> }
> ```
