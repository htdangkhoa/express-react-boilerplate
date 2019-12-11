/* @flow */
import { type ResultModelType, type ResultModelErrorType } from 'types';

export const resultModel = ({
  code = 200,
  data,
  error,
}: ResultModelType): ResultModelType => ({
  code,
  data,
  error,
});

export const success = (): ResultModelType => resultModel({ data: 'Success.' });

export const badRequest = ({
  message = 'Bad request.',
  extras,
}: ResultModelErrorType = {}): ResultModelType =>
  resultModel({
    code: 400,
    error: { message, ...extras },
  });

export const unauthorized = ({
  message = 'Unauthorized.',
  extras,
}: ResultModelErrorType = {}): ResultModelType =>
  resultModel({
    code: 401,
    error: { message, ...extras },
  });

export const notFoundError = ({
  message = 'Not found.',
  extras,
}: ResultModelErrorType = {}): ResultModelType =>
  resultModel({
    code: 404,
    error: { message, ...extras },
  });

export const internalServerError = ({
  message = 'Internal server error.',
  extras,
}: ResultModelErrorType = {}) =>
  resultModel({
    code: 500,
    error: { message, ...extras },
  });

export const genericError = ({
  message = 'Something went wrong.',
  extras,
}: ResultModelErrorType = {}) =>
  resultModel({
    code: 1000,
    error: { message, ...extras },
  });
