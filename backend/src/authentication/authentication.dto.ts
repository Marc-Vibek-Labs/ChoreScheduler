import * as Joi from 'joi';

export interface ISignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: number;
}

export interface ILogin {
  email: string;
  password: string;
}

export const signUpSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please enter a correct email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'any.required': 'Password is required',
  }),
  phoneNumber: Joi.number().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please enter a correct email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'any.required': 'Password is required',
  }),
});
