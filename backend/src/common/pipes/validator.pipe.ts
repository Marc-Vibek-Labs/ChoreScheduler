import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import Joi, { AnySchema, ValidationError } from 'joi';

@Injectable()
export class ValidatorPipe implements PipeTransform {
  constructor(
    private readonly schema: AnySchema,
    private readonly context: Joi.Context = {},
  ) {}

  public transform(value: unknown): unknown {
    const validationResult = this.validate(value);

    if (validationResult.error) {
      throw new BadRequestException(validationResult.error.message);
    }

    return value;
  }

  private validate(value: unknown): ValidationResult {
    return this.schema.validate(value, { context: this.context });
  }
}

interface ValidationResult {
  value: unknown;
  error?: ValidationError;
}
