// Unsure if these belong in a helper or a constants file instead
export type Primitive =
  | string
  | number
  | Date
  | boolean
  | symbol
  | undefined
  | null;
export type RecursiveObject = {
  [Key: string]: Primitive | RecursiveObject | Primitive[] | RecursiveObject[];
};

export type NestedPartial<K> = {
  [Property in keyof K]?: K[Property] extends object
    ? NestedPartial<K[Property]>
    : K[Property];
};

export type CapitalizeKeys<Type> = {
  [Property in keyof Type as Capitalize<string & Property>]: Type[Property];
};

export function isNullOrUndefined(value: any): boolean {
  return typeof value === 'undefined' || value === null;
}
