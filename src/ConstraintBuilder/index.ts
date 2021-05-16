import { ClassConstraint } from './Class';
import { StringConstraint } from './String';
import { NumberConstraint } from './Number';
import { BooleanConstraint } from './Boolean';
import { inParallel } from './inParallel';
import { inSeries } from './inSeries';
import { isIn } from './isIn';
import { ArrayOf } from './ArrayOf';

export const ConstraintBuilder = {
  inParallel,
  inSeries,
  Class: ClassConstraint,
  String: StringConstraint,
  Number: NumberConstraint,
  Boolean: BooleanConstraint,
  isIn,
  ArrayOf,
};