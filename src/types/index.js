/* @flow */
import { type Express } from 'express';
import { type MongoClient, type Db } from 'mongodb';
import { type HelmetData } from 'react-helmet';

export type MongoConnectionType = {
  host: string,

  database: string,

  user?: string,

  password?: string,

  app?: Express,
};

export type MongoResultType = {
  client: MongoClient,

  db: Db,
};

export type ResultModelErrorType = {
  message?: string,

  extras?: Object,
};

export type ResultModelType = {
  code?: number,

  data?: any,

  error?: ResultModelErrorType,
};

export type RenderHtmlType = {
  head: HelmetData,

  htmlContent: string,

  initialState?: Object,
};

export type ConfigureStoreType = {
  initialState?: Object,

  url?: string,
};

export type ActionType = {
  type: string,

  payload: any,
};

export type RequestType = {
  host?: string,

  url?: string,

  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',

  params?: Object,

  data?: Object,

  headers?: Object,

  token?: string,
};

export type ApiDataType = {
  code?: number,

  data?: any,

  error?: { message?: string },
};

export type ApiActionType = {
  label?: string,

  onSuccess?: (data: ApiDataType) => void,

  onError?: (data: ApiDataType) => void,
} & RequestType;

export type ThemeType = 'light' | 'dark';

export type GlobalStateType = {
  loading?: boolean,
  accessToken: ?string,
  refreshToken: ?string,
  user?: Object,
  theme?: ThemeType,
};

export type PostCommentActionType = {
  _id: string,
  comment: string,
};
