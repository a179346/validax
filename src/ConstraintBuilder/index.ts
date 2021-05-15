import { ClassConstraint } from './Class';
import { inParallel } from './inParallel';
import { inSeries } from './inSeries';

export const ConstraintBuilder = {
  inParallel,
  inSeries,
  Class: ClassConstraint,
};