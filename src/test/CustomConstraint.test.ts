import { CustomConstraint, ValidaxSchema, Validax } from '../index';
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

describe('CustomConstraint test', () => {
  describe('without options', () => {
    const error = new Error('invalid title');
    @ValidaxSchema()
    class testSchema {
      @new CustomConstraint((val) => {
        if (val === 1.23 || Array.isArray(val))
          return;
        throw error;
      }).Decorator()
      title!: 1.23 | any[];
    }

    it('pass test', () => {
      passTest({ title: 1.23 }, testSchema);
      passTest({ title: [ true, 123 ] }, testSchema);
      passTest({ title: [] }, testSchema);
      passTest({ title: [ true ] }, testSchema);
      passTest({ title: [ true, false ] }, testSchema);
      passTest({ title: [ false, true, false ] }, testSchema);
      passTest({ title: [ '123' ] }, testSchema);
      passTest({ title: [ 123 ] }, testSchema);
      passTest({ title: [ null ] }, testSchema);
      passTest({ title: [ undefined ] }, testSchema);
      passTest({ title: [ {} ] }, testSchema);
      passTest({ title: [ true, 123, '123', [] ] }, testSchema);
      passTest({ title: [ true, 123, '123' ] }, testSchema);
      passTest({ title: [ true, null ] }, testSchema);
      passTest({ title: [ true, undefined ] }, testSchema);
      passTest({ title: [ true, {} ] }, testSchema);
      passTest({ title: [ true, [] ] }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: true }, testSchema);
      failTest({ title: false }, testSchema);
      failTest({ title: Infinity }, testSchema);
      failTest({ title: -Infinity }, testSchema);
      failTest({ title: -123 }, testSchema);
      failTest({ title: 123 }, testSchema);
      failTest({ title: 0 }, testSchema);
      failTest({ title: '123' }, testSchema);
      failTest({ title: '' }, testSchema);
      failTest({ title: null }, testSchema);
      failTest({ title: NaN }, testSchema);
      failTest({ title: undefined }, testSchema);
      failTest({ title: {} }, testSchema);
      failTest({ title2: '123' }, testSchema);
      failTest({ }, testSchema);
      failTest(null, testSchema);
      failTest(undefined, testSchema);
    });
  });
});