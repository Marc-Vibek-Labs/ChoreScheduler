import * as Joi from 'joi';

export interface ISignUp {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export const signUpSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  username: Joi.string()
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

export const loginSchema = Joi.object({
  username: Joi.string()
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
