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

describe('ConstraintBuilder.String test', () => {
  describe('without options', () => {
    @ValidaxSchema()
    class testSchema {
      @ConstraintBuilder.String().Decorator()
      title!: string;
    }

    it('pass test', () => {
      passTest({ title: '123' }, testSchema);
      passTest({ title: '123456' }, testSchema);
      passTest({ title: '' }, testSchema);
      passTest({ title: '123456789' }, testSchema);
      passTest({ title: 'abcdefghij' }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: 123 }, testSchema);
      failTest({ title: null }, testSchema);
      failTest({ title: undefined }, testSchema);
      failTest({ title: NaN }, testSchema);
      failTest({ title: true }, testSchema);
      failTest({ title: [ '123' ] }, testSchema);
      failTest({ title: {} }, testSchema);
      failTest({ title2: '123' }, testSchema);
      failTest({ }, testSchema);
      failTest(null, testSchema);
      failTest(undefined, testSchema);
    });
  });

  describe('with options.allowNull', () => {
    @ValidaxSchema()
    class testSchema {
      @ConstraintBuilder.String({ allowNull: true }).Decorator()
      title!: string;
    }

    it('pass test', () => {
      passTest({ title: '123' }, testSchema);
      passTest({ title: '123456' }, testSchema);
      passTest({ title: '' }, testSchema);
      passTest({ title: '123456789' }, testSchema);
      passTest({ title: 'abcdefghij' }, testSchema);
      passTest({ title: null }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: 123 }, testSchema);
      failTest({ title: undefined }, testSchema);
      failTest({ title: NaN }, testSchema);
      failTest({ title: true }, testSchema);
      failTest({ title: [ '123' ] }, testSchema);
      failTest({ title: {} }, testSchema);
      failTest({ title2: '123' }, testSchema);
      failTest({ }, testSchema);
      failTest(null, testSchema);
      failTest(undefined, testSchema);
    });
  });

  describe('with options.allowUndefined', () => {
    @ValidaxSchema()
    class testSchema {
      @ConstraintBuilder.String({ allowUndefined: true }).Decorator()
      title!: string;
    }

    it('pass test', () => {
      passTest({ title: '123' }, testSchema);
      passTest({ title: '123456' }, testSchema);
      passTest({ title: '' }, testSchema);
      passTest({ title: '123456789' }, testSchema);
      passTest({ title: 'abcdefghij' }, testSchema);
      passTest({ title: undefined }, testSchema);
      passTest({ title2: '123' }, testSchema);
      passTest({ }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: 123 }, testSchema);
      failTest({ title: null }, testSchema);
      failTest({ title: NaN }, testSchema);
      failTest({ title: true }, testSchema);
      failTest({ title: [ '123' ] }, testSchema);
      failTest({ title: {} }, testSchema);
      failTest(null, testSchema);
      failTest(undefined, testSchema);
    });
  });

  describe('with options.maxLength', () => {
    @ValidaxSchema()
    class testSchema {
      @ConstraintBuilder.String({ maxLength: 6 }).Decorator()
      title!: string;
    }

    it('pass test', () => {
      passTest({ title: '123' }, testSchema);
      passTest({ title: '123456' }, testSchema);
      passTest({ title: '' }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: '123456789' }, testSchema);
      failTest({ title: 'abcdefghij' }, testSchema);
      failTest({ title: 123 }, testSchema);
      failTest({ title: NaN }, testSchema);
      failTest({ title: true }, testSchema);
      failTest({ title: [ '123' ] }, testSchema);
      failTest({ title: null }, testSchema);
      failTest({ title: undefined }, testSchema);
      failTest({ title: {} }, testSchema);
      failTest({ title2: '123' }, testSchema);
      failTest({ }, testSchema);
      failTest(null, testSchema);
      failTest(undefined, testSchema);
    });
  });

  describe('with options.minLength', () => {
    @ValidaxSchema()
    class testSchema {
      @ConstraintBuilder.String({ minLength: 6 }).Decorator()
      title!: string;
    }

    it('pass test', () => {
      passTest({ title: '123456789' }, testSchema);
      passTest({ title: 'abcdefghij' }, testSchema);
      passTest({ title: '123456' }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: '123' }, testSchema);
      failTest({ title: '' }, testSchema);
      failTest({ title: 123 }, testSchema);
      failTest({ title: null }, testSchema);
      failTest({ title: NaN }, testSchema);
      failTest({ title: undefined }, testSchema);
      failTest({ title: true }, testSchema);
      failTest({ title: [ '123' ] }, testSchema);
      failTest({ title: {} }, testSchema);
      failTest({ title2: '123' }, testSchema);
      failTest({ }, testSchema);
      failTest(null, testSchema);
      failTest(undefined, testSchema);
    });
  });

  describe('with options.regex', () => {
    @ValidaxSchema()
    class testSchema {
      @ConstraintBuilder.String({ regex: new RegExp(/^[0-9]*$/) }).Decorator()
      title!: string;
    }

    it('pass test', () => {
      passTest({ title: '123' }, testSchema);
      passTest({ title: '123456789' }, testSchema);
      passTest({ title: '123456' }, testSchema);
      passTest({ title: '' }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: 'abcdefghij' }, testSchema);
      failTest({ title: 123 }, testSchema);
      failTest({ title: null }, testSchema);
      failTest({ title: undefined }, testSchema);
      failTest({ title: NaN }, testSchema);
      failTest({ title: true }, testSchema);
      failTest({ title: [ '123' ] }, testSchema);
      failTest({ title: {} }, testSchema);
      failTest({ title2: '123' }, testSchema);
      failTest({ }, testSchema);
      failTest(null, testSchema);
      failTest(undefined, testSchema);
    });
  });
});