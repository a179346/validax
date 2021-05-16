import { ClassConstraint } from './Class';
import { StringConstraint } from './String';
import { NumberConstraint } from './Number';
import { BooleanConstraint } from './Boolean';
import { inParallel } from './inParallel';
import { inSeries } from './inSeries';
import { isIn } from './isIn';
import { ArrayOf } from './ArrayOf';
import { Tuple } from './Tuple';
import { CustomError } from './CustomError';

export const ConstraintBuilder = {
  String: StringConstraint,
  Number: NumberConstraint,
  Boolean: BooleanConstraint,
  Class: ClassConstraint,
  CustomError,
  inParallel,
  inSeries,
  isIn,
  ArrayOf,
  Tuple,
};