import Joi, { AnySchema } from 'joi';
import { PipeTransform } from '@nestjs/common';
import { joiValidate } from '../helpers/validation.helper';

export class ValidatorPipe implements PipeTransform {
  constructor(
    private readonly schema: AnySchema,
    private readonly context: Joi.Context = {},
  ) {}

  public transform(value: unknown): unknown {
    joiValidate(this.schema, value);
    return value;
  }
}
