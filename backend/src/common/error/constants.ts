import { Model } from 'objection'

export type GeneratedFields = {
  id: string
  createdDate: Date
  updatedDate: Date
}

export type BaseFields = keyof GeneratedFields | keyof Model

export enum BaseStatus {
  DELETED = 'deleted',
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export enum ErrorCode {
  BAD_REQUEST = 'bad-request',
  INVALID_EMAIL = 'invalid-email',
  INCOMPLETE_FORM = 'incomplete-form',
  INVALID_UUID_FORMAT = 'invalid-uuid-format',
  MISSING_ENV_VARIABLE = 'missing-env-variable',
  UNKNOWN_ERROR = 'unknown-error',
  USER_NOT_FOUND = 'user-not-found',
  USER_VERIFICATION_TOKEN_NOT_FOUND = 'user-verification-token-not-found',
  USER_VERIFICATION_TOKEN_EXPIRED = 'user-verification-token-expired',
  USER_ALREADY_EXISTS = 'user-already-exists',
  UNKNOWN_VALIDATION_ERROR = 'unknown-validation-error',
  USER_REGISTRATION_FAILED = 'user-registration-failed',
  USER_VERIFICATION_FAILED = 'user-verification-failed',
  INCORRECT_USERNAME_OR_PASSWORD = 'incorrect-username-or-password',
  VERIFY_USER_EMAIL_FAILED = 'verify-user-email-failed',
  RESET_PASSWORD_EMAIL_FAILED = 'reset-password-email-failed',
  REQUEST_SMS_OTP_FAILED = 'request-sms-otp-failed',
  RESET_PASSWORD_TOKEN_NOT_FOUND = 'reset-password-token-not-found',
  RESET_PASSWORD_TOKEN_EXPIRED = 'reset-password-token-expired',
  RESET_PASSWORD_VERIFICATION_FAILED = 'reset-password-verification-failed',
  UNVERIFIED_USER = 'user-not-verified',
  RESEND_EMAIL_FAILED = 'resend-email-failed',
  NO_VALUE = 'value-not-provided',
  STRING_TYPE_MATCH = 'must-be-type-string',
  DATE_TYPE_MATCH = 'must-be-type-date',
  NUMBER_TYPE_MATCH = 'must-be-type-number',
  ALREADY_VERIFIED = 'user-already-verified',
  TOKEN_CREATION_FAILED = 'token-creation-failed',
  TOKEN_STATUS_UPDATE_FAILED = 'token-status-update-failed',
  RESET_PASSWORD_TOKEN_UNVERIFIED = 'reset-password-token-unverified',
  RESET_PASSWORD_TOKEN_ALREADY_VERIFIED = 'reset-password-token-already-verified',
  INVALID_DATE = 'invalid-date',
  INVALID_DATE_FORMAT = 'invalid-date-format',
  INVALID_PROPERTY_VALUE = 'invalid-property-value',
  UPDATE_PASSWORD_ERROR = 'update-password-error',
  PASSWORD_MATCH_FAIL = 'password-match-fail',
  INCORRECT_PASSWORD = 'incorrect-password'
}

export const errorMessages = {
  [ErrorCode.BAD_REQUEST]: 'Invalid request.',
  [ErrorCode.INVALID_EMAIL]: 'Invalid email format.',
  [ErrorCode.INCOMPLETE_FORM]: 'Form is incomplete.',
  [ErrorCode.MISSING_ENV_VARIABLE]:
    'Missing required environment variable. Please contact admin.',
  [ErrorCode.USER_NOT_FOUND]: 'User was not found.',
  [ErrorCode.USER_VERIFICATION_TOKEN_NOT_FOUND]:
    'User verification token record was not found.',
  [ErrorCode.USER_VERIFICATION_TOKEN_EXPIRED]:
    'User verification token has expired, please request a new one.',
  [ErrorCode.UNKNOWN_ERROR]: 'An unknown error occured.',
  [ErrorCode.INCORRECT_USERNAME_OR_PASSWORD]: 'Incorrect username or password',
  [ErrorCode.UNKNOWN_VALIDATION_ERROR]: 'An unknown validation error occured.',
  [ErrorCode.USER_ALREADY_EXISTS]:
    'An account registered with this e-mail already exists. Kindly proceed with login or try another email.',
  [ErrorCode.USER_REGISTRATION_FAILED]:
    'Failed to register user. Please contact admin.',
  [ErrorCode.USER_VERIFICATION_FAILED]:
    'Failed to verify user. Please contact admin.',
  [ErrorCode.VERIFY_USER_EMAIL_FAILED]:
    'Failed to send user verification email. Please contact admin.',
  [ErrorCode.RESET_PASSWORD_EMAIL_FAILED]:
    'Failed to send reset password email. Please contact admin.',
  [ErrorCode.REQUEST_SMS_OTP_FAILED]: 'Failed to generate sms otp.',
  [ErrorCode.RESET_PASSWORD_TOKEN_NOT_FOUND]: 'Reset password token not found.',
  [ErrorCode.RESET_PASSWORD_TOKEN_EXPIRED]:
    'Reset password token has been expired.',
  [ErrorCode.RESET_PASSWORD_VERIFICATION_FAILED]:
    'Reset password token verification failed.',
  [ErrorCode.UNVERIFIED_USER]: 'User not verified.',
  [ErrorCode.RESEND_EMAIL_FAILED]: 'Failed to resend email.',
  [ErrorCode.ALREADY_VERIFIED]: 'User is already verified.',
  [ErrorCode.TOKEN_CREATION_FAILED]: 'Creating new token has failed.',
  [ErrorCode.TOKEN_STATUS_UPDATE_FAILED]: 'Failed to update token status.',
  [ErrorCode.RESET_PASSWORD_TOKEN_UNVERIFIED]:
    'Reset password token unverified.',
  [ErrorCode.RESET_PASSWORD_TOKEN_ALREADY_VERIFIED]:
    'Reset password token already verified.',
  [ErrorCode.INVALID_DATE]: 'Invalid date.',
  [ErrorCode.INVALID_DATE_FORMAT]: 'Invalid date format.'
}
