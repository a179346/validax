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

describe('ConstraintBuilder.Number test', () => {
  describe('without options', () => {
    @ValidaxSchema()
    class testSchema {
      @ConstraintBuilder.Number().Decorator()
      title!: number;
    }

    it('pass test', () => {
      passTest({ title: Infinity }, testSchema);
      passTest({ title: -Infinity }, testSchema);
      passTest({ title: -123 }, testSchema);
      passTest({ title: 1.23 }, testSchema);
      passTest({ title: 123 }, testSchema);
      passTest({ title: 0 }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: '123' }, testSchema);
      failTest({ title: '' }, testSchema);
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

  describe('with options.allowNull', () => {
    @ValidaxSchema()
    class testSchema {
      @ConstraintBuilder.Number({ allowNull: true }).Decorator()
      title!: number;
    }

    it('pass test', () => {
      passTest({ title: Infinity }, testSchema);
      passTest({ title: -Infinity }, testSchema);
      passTest({ title: -123 }, testSchema);
      passTest({ title: 1.23 }, testSchema);
      passTest({ title: 123 }, testSchema);
      passTest({ title: 0 }, testSchema);
      passTest({ title: null }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: '123' }, testSchema);
      failTest({ title: '' }, testSchema);
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
      @ConstraintBuilder.Number({ allowUndefined: true }).Decorator()
      title!: number;
    }

    it('pass test', () => {
      passTest({ title: Infinity }, testSchema);
      passTest({ title: -Infinity }, testSchema);
      passTest({ title: -123 }, testSchema);
      passTest({ title: 1.23 }, testSchema);
      passTest({ title: 123 }, testSchema);
      passTest({ title: 0 }, testSchema);
      passTest({ title2: '123' }, testSchema);
      passTest({ }, testSchema);
      passTest({ title: undefined }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: '123' }, testSchema);
      failTest({ title: '' }, testSchema);
      failTest({ title: null }, testSchema);
      failTest({ title: NaN }, testSchema);
      failTest({ title: true }, testSchema);
      failTest({ title: [ '123' ] }, testSchema);
      failTest({ title: {} }, testSchema);
      failTest(null, testSchema);
      failTest(undefined, testSchema);
    });
  });

  describe('with options.allowNaN', () => {
    @ValidaxSchema()
    class testSchema {
      @ConstraintBuilder.Number({ allowNaN: true }).Decorator()
      title!: number;
    }

    it('pass test', () => {
      passTest({ title: Infinity }, testSchema);
      passTest({ title: -Infinity }, testSchema);
      passTest({ title: -123 }, testSchema);
      passTest({ title: 1.23 }, testSchema);
      passTest({ title: 123 }, testSchema);
      passTest({ title: 0 }, testSchema);
      passTest({ title: NaN }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: '123' }, testSchema);
      failTest({ title: '' }, testSchema);
      failTest({ title: undefined }, testSchema);
      failTest({ title: null }, testSchema);
      failTest({ title: true }, testSchema);
      failTest({ title: [ '123' ] }, testSchema);
      failTest({ title: {} }, testSchema);
      failTest({ title2: '123' }, testSchema);
      failTest({ }, testSchema);
      failTest(null, testSchema);
      failTest(undefined, testSchema);
    });
  });

  describe('with options.isFinite', () => {
    @ValidaxSchema()
    class testSchema {
      @ConstraintBuilder.Number({ isFinite: true }).Decorator()
      title!: number;
    }

    it('pass test', () => {
      passTest({ title: -123 }, testSchema);
      passTest({ title: 1.23 }, testSchema);
      passTest({ title: 123 }, testSchema);
      passTest({ title: 0 }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: null }, testSchema);
      failTest({ title: Infinity }, testSchema);
      failTest({ title: -Infinity }, testSchema);
      failTest({ title: '123' }, testSchema);
      failTest({ title: '' }, testSchema);
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

  describe('with options.isInteger', () => {
    @ValidaxSchema()
    class testSchema {
      @ConstraintBuilder.Number({ isInteger: true }).Decorator()
      title!: number;
    }

    it('pass test', () => {
      passTest({ title: -123 }, testSchema);
      passTest({ title: 123 }, testSchema);
      passTest({ title: 0 }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: null }, testSchema);
      failTest({ title: 1.23 }, testSchema);
      failTest({ title: Infinity }, testSchema);
      failTest({ title: -Infinity }, testSchema);
      failTest({ title: '123' }, testSchema);
      failTest({ title: '' }, testSchema);
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

  describe('with options.max = 0', () => {
    @ValidaxSchema()
    class testSchema {
      @ConstraintBuilder.Number({ max: 0 }).Decorator()
      title!: number;
    }

    it('pass test', () => {
      passTest({ title: -123 }, testSchema);
      passTest({ title: -Infinity }, testSchema);
      passTest({ title: 0 }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: Infinity }, testSchema);
      failTest({ title: 1.23 }, testSchema);
      failTest({ title: 123 }, testSchema);
      failTest({ title: null }, testSchema);
      failTest({ title: '123' }, testSchema);
      failTest({ title: '' }, testSchema);
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

  describe('with options.min = 0', () => {
    @ValidaxSchema()
    class testSchema {
      @ConstraintBuilder.Number({ min: 0 }).Decorator()
      title!: number;
    }

    it('pass test', () => {
      passTest({ title: Infinity }, testSchema);
      passTest({ title: 1.23 }, testSchema);
      passTest({ title: 123 }, testSchema);
      passTest({ title: 0 }, testSchema);
    });

    it('fail test', () => {
      failTest({ title: -Infinity }, testSchema);
      failTest({ title: -123 }, testSchema);
      failTest({ title: null }, testSchema);
      failTest({ title: '123' }, testSchema);
      failTest({ title: '' }, testSchema);
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