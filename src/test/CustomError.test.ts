import { ConstraintBuilder, ValidaxSchema, Validax } from '../index';
import { expect } from 'chai';

type Schema<T> = { new (...args: any[]): T; }

function passTest (testVal: any, schema: Schema<any>) {
  expect(Validax.validate(testVal, schema)).to.equal(true);
  function assertFunc () {
    Validax.assert(testVal, schema);
  }
  expect(assertFunc).to.not.throw();
}

function failTest (testVal: any, schema: Schema<any>, error: any = Error) {
  expect(Validax.validate(testVal, schema)).to.equal(false);
  function assertFunc () {
    Validax.assert(testVal, schema);
  }
  expect(assertFunc).to.throw(error);
}

describe('ConstraintBuilder.CustomError test', () => {
  describe('without options', () => {
    const error = new Error('title isn\'t a valid boolean value.');
    @ValidaxSchema()
    class testSchema {
      @ConstraintBuilder.CustomError(ConstraintBuilder.Boolean(), error).Decorator()
      title!: boolean;
    }

    it('pass test', () => {
      passTest({ title: true }, testSchema);
      passTest({ title: false }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: Infinity }, testSchema, error);
      failTest({ title: -Infinity }, testSchema, error);
      failTest({ title: -123 }, testSchema, error);
      failTest({ title: 1.23 }, testSchema, error);
      failTest({ title: 123 }, testSchema, error);
      failTest({ title: 0 }, testSchema, error);
      failTest({ title: '123' }, testSchema, error);
      failTest({ title: '' }, testSchema, error);
      failTest({ title: null }, testSchema, error);
      failTest({ title: NaN }, testSchema, error);
      failTest({ title: undefined }, testSchema, error);
      failTest({ title: [ '123' ] }, testSchema, error);
      failTest({ title: {} }, testSchema, error);
      failTest({ title2: '123' }, testSchema, error);
      failTest({ }, testSchema, error);
      failTest(null, testSchema);
      failTest(undefined, testSchema);
    });
  });
});