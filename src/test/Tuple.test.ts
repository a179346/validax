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

describe('ConstraintBuilder.Tuple test', () => {
  describe('without options', () => {
    @ValidaxSchema()
    class testSchema {
      @ConstraintBuilder.Tuple([ ConstraintBuilder.Boolean(), ConstraintBuilder.Number() ]).Decorator()
      title!: boolean;
    }

    it('pass test', () => {
      passTest({ title: [ true, 123 ] }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: [] }, testSchema);
      failTest({ title: [ true ] }, testSchema);
      failTest({ title: [ true, false ] }, testSchema);
      failTest({ title: [ false, true, false ] }, testSchema);
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
      failTest({ title: [ 123 ] }, testSchema);
      failTest({ title: [ null ] }, testSchema);
      failTest({ title: [ undefined ] }, testSchema);
      failTest({ title: [ {} ] }, testSchema);
      failTest({ title: [ true, 123, '123', [] ] }, testSchema);
      failTest({ title: [ true, 123, '123' ] }, testSchema);
      failTest({ title: [ true, null ] }, testSchema);
      failTest({ title: [ true, undefined ] }, testSchema);
      failTest({ title: [ true, {} ] }, testSchema);
      failTest({ title: [ true, [] ] }, testSchema);
      failTest({ }, testSchema);
      failTest(null, testSchema);
      failTest(undefined, testSchema);
    });
  });

  describe('with options.allowNull', () => {
    @ValidaxSchema()
    class testSchema {
      @ConstraintBuilder.Tuple([ ConstraintBuilder.Boolean(), ConstraintBuilder.Number() ], { allowNull: true }).Decorator()
      title!: boolean;
    }

    it('pass test', () => {
      passTest({ title: [ true, 123 ] }, testSchema);
      passTest({ title: null }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: [] }, testSchema);
      failTest({ title: [ true ] }, testSchema);
      failTest({ title: [ true, false ] }, testSchema);
      failTest({ title: [ false, true, false ] }, testSchema);
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
      failTest({ title: [ 123 ] }, testSchema);
      failTest({ title: [ null ] }, testSchema);
      failTest({ title: [ undefined ] }, testSchema);
      failTest({ title: [ {} ] }, testSchema);
      failTest({ title: [ true, 123, '123', [] ] }, testSchema);
      failTest({ title: [ true, 123, '123' ] }, testSchema);
      failTest({ title: [ true, null ] }, testSchema);
      failTest({ title: [ true, undefined ] }, testSchema);
      failTest({ title: [ true, {} ] }, testSchema);
      failTest({ title: [ true, [] ] }, testSchema);
      failTest({ }, testSchema);
      failTest(null, testSchema);
      failTest(undefined, testSchema);
    });
  });

  describe('with options.allowUndefined', () => {
    @ValidaxSchema()
    class testSchema {
      @ConstraintBuilder.Tuple([ ConstraintBuilder.Boolean(), ConstraintBuilder.Number() ], { allowUndefined: true }).Decorator()
      title!: boolean;
    }

    it('pass test', () => {
      passTest({ title: [ true, 123 ] }, testSchema);
      passTest({ title: undefined }, testSchema);
      passTest({ title2: '123' }, testSchema);
      passTest({ }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: null }, testSchema);
      failTest({ title: [] }, testSchema);
      failTest({ title: [ true ] }, testSchema);
      failTest({ title: [ true, false ] }, testSchema);
      failTest({ title: [ false, true, false ] }, testSchema);
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
      failTest({ title: [ 123 ] }, testSchema);
      failTest({ title: [ null ] }, testSchema);
      failTest({ title: [ undefined ] }, testSchema);
      failTest({ title: [ {} ] }, testSchema);
      failTest({ title: [ true, 123, '123', [] ] }, testSchema);
      failTest({ title: [ true, 123, '123' ] }, testSchema);
      failTest({ title: [ true, null ] }, testSchema);
      failTest({ title: [ true, undefined ] }, testSchema);
      failTest({ title: [ true, {} ] }, testSchema);
      failTest({ title: [ true, [] ] }, testSchema);
      failTest(null, testSchema);
      failTest(undefined, testSchema);
    });
  });

  describe('with options.allowExtraDataLength', () => {
    @ValidaxSchema()
    class testSchema {
      @ConstraintBuilder.Tuple([ ConstraintBuilder.Boolean(), ConstraintBuilder.Number() ], { allowExtraDataLength: true }).Decorator()
      title!: boolean;
    }

    it('pass test', () => {
      passTest({ title: [ true, 123 ] }, testSchema);
      passTest({ title: [ true, 123, '123', [] ] }, testSchema);
      passTest({ title: [ true, 123, '123' ] }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: null }, testSchema);
      failTest({ title: [] }, testSchema);
      failTest({ title: [ true ] }, testSchema);
      failTest({ title: [ true, false ] }, testSchema);
      failTest({ title: [ false, true, false ] }, testSchema);
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
      failTest({ title: [ 123 ] }, testSchema);
      failTest({ title: [ null ] }, testSchema);
      failTest({ title: [ undefined ] }, testSchema);
      failTest({ title: [ {} ] }, testSchema);
      failTest({ title: [ true, null ] }, testSchema);
      failTest({ title: [ true, undefined ] }, testSchema);
      failTest({ title: [ true, {} ] }, testSchema);
      failTest({ title: [ true, [] ] }, testSchema);
      failTest({ }, testSchema);
      failTest(null, testSchema);
      failTest(undefined, testSchema);
    });
  });
});