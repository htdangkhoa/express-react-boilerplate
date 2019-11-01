// @flow
import { type ResultModelType } from 'types';

export const resultModel = ({
  code = 200,
  data,
  error,
}: ResultModelType): ResultModelType => ({
  code,
  data,
  error: { message: error?.message },
});

export const success = (): ResultModelType => resultModel({ data: 'Success.' });

export const badRequest = (
  message?: string = 'Bad request.',
): ResultModelType =>
  resultModel({
    code: 400,
    error: { message },
  });
