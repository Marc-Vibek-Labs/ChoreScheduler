import * as Joi from 'joi';
import { ValidationResult } from 'joi';
import { ErrorCode } from '../constants';
import { BadRequestException } from '@nestjs/common';
import { IErrorResponse } from '../../error/error.dto';

export function joiValidate(schema: Joi.Schema, value: unknown): void {
  const result: ValidationResult = schema.validate(value);
  if (result.error) {
    const errorDetail: Joi.ValidationErrorItem = result.error.details[0];

    const errorResponse: IErrorResponse = {
      errorCode: ErrorCode.BAD_REQUEST,
      message: errorDetail.message,
      context: {
        type: errorDetail.type,
        ...errorDetail.context,
      },
    };

    throw new BadRequestException(errorResponse);
  }
}

export const phoneNumberSchema: Joi.StringSchema =
  Joi.string().pattern(/^\+?\d+$/);
export const percentageDecimalSchema: Joi.NumberSchema = Joi.number()
  .min(0)
  .max(1);
export const percentageSchemaShareholding: Joi.NumberSchema = Joi.number()
  .min(0)
  .max(100);

export function convertToOptionalSchema(
  schemaObject: Joi.ObjectSchema,
): Joi.ObjectSchema {
  return schemaObject.fork(
    schemaObject.$_terms.keys.map((key: { key: string }) => key.key),
    (oldSchema) =>
      oldSchema.type === 'object'
        ? convertToOptionalSchema(oldSchema.optional() as Joi.ObjectSchema)
        : oldSchema.allow(null, '').optional(),
  );
}

export function schemaMap(
  schemaObject: Joi.ObjectSchema,
  schemaTransformFn: (schema: Joi.Schema) => Joi.Schema,
  keyTransformFn: (
    key: string | string[] | string[][],
  ) => string | string[] | string[][] = (key) => key,
): Joi.ObjectSchema {
  return schemaObject.fork(
    schemaObject.$_terms.keys.map((key: { key: string }) =>
      keyTransformFn(key.key),
    ),
    (oldSchema) =>
      oldSchema.type === 'object'
        ? schemaMap(oldSchema.optional() as Joi.ObjectSchema, schemaTransformFn)
        : schemaTransformFn(oldSchema),
  );
}
