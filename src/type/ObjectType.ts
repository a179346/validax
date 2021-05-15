export type ObjectType<T> = {
  new (...args: any[]): T;
  validaxClassId?: number;
}