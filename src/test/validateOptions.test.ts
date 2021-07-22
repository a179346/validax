import { ConstraintBuilder, ValidaxSchema, Validax } from '../index';
import { expect } from 'chai';
import { validateOptions } from '../Validax';

type Schema<T> = { new (...args: any[]): T; }

function passTest (testVal: any, schema: Schema<any>, validateOptions?: validateOptions) {
  expect(Validax.validate(testVal, schema, validateOptions)).to.equal(true);
  function assertFunc () {
    Validax.assert(testVal, schema, validateOptions);
  }
  expect(assertFunc).to.not.throw();
}

function failTest (testVal: any, schema: Schema<any>, validateOptions?: validateOptions, error: any = Error) {
  expect(Validax.validate(testVal, schema, validateOptions)).to.equal(false);
  function assertFunc () {
    Validax.assert(testVal, schema, validateOptions);
  }
  expect(assertFunc).to.throw(error);
}

describe('validateOptions test', () => {
  describe('without validateOptions', () => {
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
      passTest({ title: { title: '' }, title2: '123' }, testSchema);
      passTest({ title: { title: '' }, title2: null }, testSchema);
      passTest({ title: { title: '' }, title2: undefined }, testSchema);
      passTest({ title: { title: '' }, title2: 123 }, testSchema);
      passTest({ title: { title: '' }, title2: [] }, testSchema);
      passTest({ title: { title: '', title2: '123' } }, testSchema);
      passTest({ title: { title: '', title2: null } }, testSchema);
      passTest({ title: { title: '', title2: undefined } }, testSchema);
      passTest({ title: { title: '', title2: 123 } }, testSchema);
      passTest({ title: { title: '', title2: [] } }, testSchema);
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

  describe('validateOptions.strict = false', () => {
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
      passTest({ title: { title: '123' } }, testSchema, { strict: false });
      passTest({ title: { title: '' } }, testSchema, { strict: false });
      passTest({ title: { title: '' }, title2: '123' }, testSchema, { strict: false });
      passTest({ title: { title: '' }, title2: null }, testSchema, { strict: false });
      passTest({ title: { title: '' }, title2: undefined }, testSchema, { strict: false });
      passTest({ title: { title: '' }, title2: 123 }, testSchema, { strict: false });
      passTest({ title: { title: '' }, title2: [] }, testSchema, { strict: false });
      passTest({ title: { title: '', title2: '123' } }, testSchema, { strict: false });
      passTest({ title: { title: '', title2: null } }, testSchema, { strict: false });
      passTest({ title: { title: '', title2: undefined } }, testSchema, { strict: false });
      passTest({ title: { title: '', title2: 123 } }, testSchema, { strict: false });
      passTest({ title: { title: '', title2: [] } }, testSchema, { strict: false });
    });

    it('fail test', () => {
      failTest({ title: { title: null } }, testSchema, { strict: false });
      failTest({ title: { title: undefined } }, testSchema, { strict: false });
      failTest({ title: true }, testSchema, { strict: false });
      failTest({ title: false }, testSchema, { strict: false });
      failTest({ title: Infinity }, testSchema, { strict: false });
      failTest({ title: -Infinity }, testSchema, { strict: false });
      failTest({ title: -123 }, testSchema, { strict: false });
      failTest({ title: 1.23 }, testSchema, { strict: false });
      failTest({ title: 123 }, testSchema, { strict: false });
      failTest({ title: 0 }, testSchema, { strict: false });
      failTest({ title: '123' }, testSchema, { strict: false });
      failTest({ title: '' }, testSchema, { strict: false });
      failTest({ title: null }, testSchema, { strict: false });
      failTest({ title: NaN }, testSchema, { strict: false });
      failTest({ title: undefined }, testSchema, { strict: false });
      failTest({ title: [ '123' ] }, testSchema, { strict: false });
      failTest({ title: {} }, testSchema, { strict: false });
      failTest({ title2: '123' }, testSchema, { strict: false });
      failTest({ }, testSchema, { strict: false });
      failTest(null, testSchema, { strict: false });
      failTest(undefined, testSchema, { strict: false });
    });
  });

  describe('validateOptions.strict = true', () => {
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
      passTest({ title: { title: '123' } }, testSchema, { strict: true });
      passTest({ title: { title: '' } }, testSchema, { strict: true });
    });

    it('fail test', () => {
      failTest({ title: { title: '' }, title2: '123' }, testSchema, { strict: true });
      failTest({ title: { title: '' }, title2: null }, testSchema, { strict: true });
      failTest({ title: { title: '' }, title2: undefined }, testSchema, { strict: true });
      failTest({ title: { title: '' }, title2: 123 }, testSchema, { strict: true });
      failTest({ title: { title: '' }, title2: [] }, testSchema, { strict: true });
      failTest({ title: { title: '', title2: '123' } }, testSchema, { strict: true });
      failTest({ title: { title: '', title2: null } }, testSchema, { strict: true });
      failTest({ title: { title: '', title2: undefined } }, testSchema, { strict: true });
      failTest({ title: { title: '', title2: 123 } }, testSchema, { strict: true });
      failTest({ title: { title: '', title2: [] } }, testSchema, { strict: true });

      failTest({ title: { title: null } }, testSchema, { strict: true });
      failTest({ title: { title: undefined } }, testSchema, { strict: true });
      failTest({ title: true }, testSchema, { strict: true });
      failTest({ title: false }, testSchema, { strict: true });
      failTest({ title: Infinity }, testSchema, { strict: true });
      failTest({ title: -Infinity }, testSchema, { strict: true });
      failTest({ title: -123 }, testSchema, { strict: true });
      failTest({ title: 1.23 }, testSchema, { strict: true });
      failTest({ title: 123 }, testSchema, { strict: true });
      failTest({ title: 0 }, testSchema, { strict: true });
      failTest({ title: '123' }, testSchema, { strict: true });
      failTest({ title: '' }, testSchema, { strict: true });
      failTest({ title: null }, testSchema, { strict: true });
      failTest({ title: NaN }, testSchema, { strict: true });
      failTest({ title: undefined }, testSchema, { strict: true });
      failTest({ title: [ '123' ] }, testSchema, { strict: true });
      failTest({ title: {} }, testSchema, { strict: true });
      failTest({ title2: '123' }, testSchema, { strict: true });
      failTest({ }, testSchema, { strict: true });
      failTest(null, testSchema, { strict: true });
      failTest(undefined, testSchema, { strict: true });
    });
  });
});