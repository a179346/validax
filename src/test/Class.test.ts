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

describe('ConstraintBuilder.Class test', () => {
  describe('without options', () => {
    @ValidaxSchema()
    class testSchema2 {
      @ConstraintBuilder.String().Decorator()
      title!: string;
    }
    @ValidaxSchema()
    class testSchema {
      @ConstraintBuilder.Class(testSchema2).Decorator()
      title!: testSchema2;
    }

    it('pass test', () => {
      passTest({ title: { title: '123' } }, testSchema);
      passTest({ title: { title: '' } }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: { title: null } }, testSchema);
      failTest({ title: { title: undefined } }, testSchema);
      failTest({ title: true }, testSchema);
      failTest({ title: false }, testSchema);
      failTest({ title: Infinity }, testSchema);
      failTest({ title: -Infinity }, testSchema);
      failTest({ title: -123 }, testSchema);
      failTest({ title: 1.23 }, testSchema);
      failTest({ title: 123 }, testSchema);
      failTest({ title: 0 }, testSchema);
      failTest({ title: '123' }, testSchema);
      failTest({ title: '' }, testSchema);
      failTest({ title: null }, testSchema);
      failTest({ title: NaN }, testSchema);
      failTest({ title: undefined }, testSchema);
      failTest({ title: [ '123' ] }, testSchema);
      failTest({ title: {} }, testSchema);
      failTest({ title2: '123' }, testSchema);
      failTest({ }, testSchema);
      failTest(null, testSchema);
      failTest(undefined, testSchema);
    });
  });

  describe('error when not object', () => {
    const testSchema2NotObjectError = new Error('testSchema2 Not Object');
    @ValidaxSchema(testSchema2NotObjectError)
    class testSchema2 {
      @ConstraintBuilder.String().Decorator()
      title!: string;
    }
    const testSchemaNotObjectError = new Error('testSchema Not Object');
    @ValidaxSchema(testSchemaNotObjectError)
    class testSchema {
      @ConstraintBuilder.Class(testSchema2).Decorator()
      title!: testSchema2;
    }

    it('pass test', () => {
      passTest({ title: { title: '123' } }, testSchema);
      passTest({ title: { title: '' } }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: { title: null } }, testSchema);
      failTest({ title: { title: undefined } }, testSchema);
      failTest({ title: true }, testSchema, testSchema2NotObjectError);
      failTest({ title: false }, testSchema, testSchema2NotObjectError);
      failTest({ title: Infinity }, testSchema, testSchema2NotObjectError);
      failTest({ title: -Infinity }, testSchema, testSchema2NotObjectError);
      failTest({ title: -123 }, testSchema, testSchema2NotObjectError);
      failTest({ title: 1.23 }, testSchema, testSchema2NotObjectError);
      failTest({ title: 123 }, testSchema, testSchema2NotObjectError);
      failTest({ title: 0 }, testSchema, testSchema2NotObjectError);
      failTest({ title: '123' }, testSchema, testSchema2NotObjectError);
      failTest({ title: '' }, testSchema, testSchema2NotObjectError);
      failTest({ title: null }, testSchema, testSchema2NotObjectError);
      failTest({ title: NaN }, testSchema, testSchema2NotObjectError);
      failTest({ title: undefined }, testSchema, testSchema2NotObjectError);
      failTest({ title: [ '123' ] }, testSchema);
      failTest({ title: {} }, testSchema);
      failTest({ title2: '123' }, testSchema, testSchema2NotObjectError);
      failTest({ }, testSchema);
      failTest(null, testSchema, testSchemaNotObjectError);
      failTest(undefined, testSchema, testSchemaNotObjectError);
    });
  });

  describe('with options.allowNull', () => {
    @ValidaxSchema()
    class testSchema2 {
      @ConstraintBuilder.String().Decorator()
      title!: string;
    }
    @ValidaxSchema()
    class testSchema {
      @ConstraintBuilder.Class(testSchema2, { allowNull: true }).Decorator()
      title!: testSchema2;
    }

    it('pass test', () => {
      passTest({ title: { title: '123' } }, testSchema);
      passTest({ title: { title: '' } }, testSchema);
      passTest({ title: null }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: { title: null } }, testSchema);
      failTest({ title: { title: undefined } }, testSchema);
      failTest({ title: true }, testSchema);
      failTest({ title: false }, testSchema);
      failTest({ title: Infinity }, testSchema);
      failTest({ title: -Infinity }, testSchema);
      failTest({ title: -123 }, testSchema);
      failTest({ title: 1.23 }, testSchema);
      failTest({ title: 123 }, testSchema);
      failTest({ title: 0 }, testSchema);
      failTest({ title: '123' }, testSchema);
      failTest({ title: '' }, testSchema);
      failTest({ title: NaN }, testSchema);
      failTest({ title: undefined }, testSchema);
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
    class testSchema2 {
      @ConstraintBuilder.String().Decorator()
      title!: string;
    }
    @ValidaxSchema()
    class testSchema {
      @ConstraintBuilder.Class(testSchema2, { allowUndefined: true }).Decorator()
      title!: testSchema2;
    }

    it('pass test', () => {
      passTest({ title: { title: '123' } }, testSchema);
      passTest({ title: { title: '' } }, testSchema);
      passTest({ title2: '123' }, testSchema);
      passTest({ }, testSchema);
      passTest({ title: undefined }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: null }, testSchema);
      failTest({ title: { title: null } }, testSchema);
      failTest({ title: { title: undefined } }, testSchema);
      failTest({ title: true }, testSchema);
      failTest({ title: false }, testSchema);
      failTest({ title: Infinity }, testSchema);
      failTest({ title: -Infinity }, testSchema);
      failTest({ title: -123 }, testSchema);
      failTest({ title: 1.23 }, testSchema);
      failTest({ title: 123 }, testSchema);
      failTest({ title: 0 }, testSchema);
      failTest({ title: '123' }, testSchema);
      failTest({ title: '' }, testSchema);
      failTest({ title: NaN }, testSchema);
      failTest({ title: [ '123' ] }, testSchema);
      failTest({ title: {} }, testSchema);
      failTest(null, testSchema);
      failTest(undefined, testSchema);
    });
  });
});