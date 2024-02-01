import { RecursiveObject, CapitalizeKeys } from './type.helper';

export function objectMap<T = RecursiveObject[keyof RecursiveObject]>(
  object: RecursiveObject,
  // Using T[keyof T] in value doesn't seem to work for some reason, unsure why
  fn: (
    key?: keyof RecursiveObject,
    value?: RecursiveObject[keyof RecursiveObject],
    index?: number,
  ) => T,
  keyTransformFn: (
    key?: keyof RecursiveObject,
    value?: RecursiveObject[keyof RecursiveObject],
    index?: number,
  ) => string | number | symbol = (key) => key.toString(),
): { [Key: string | number | symbol]: T } {
  if (!object) {
    return {};
  }
  return Object.fromEntries(
    Object.entries(object).map(([key, value], index) => [
      keyTransformFn(key),
      fn(key, value, index),
    ]),
  ) as {
    [Key: string | number | symbol]: T;
  };
}

// There could probably be better more general function for transforming keys, but for now this will just capitalize keys
export function capitalizeKeys<T extends RecursiveObject>(
  object: T,
): CapitalizeKeys<T> {
  return Object.keys(object).reduce((newObj, key: string) => {
    newObj[`${key[0].toUpperCase()}${key.substring(1)}`] = object[key];
    return newObj;
  }, {}) as CapitalizeKeys<T>;
}
