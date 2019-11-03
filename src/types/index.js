/* @flow */
import { type Express } from 'express';
import { type MongoClient, type Db, type Collection } from 'mongodb';
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

export type RouteType = {
  route: { routes: Array<Object> },
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

  onSuccess?: (data?: ApiDataType) => void,

  onError?: (data?: ApiDataType) => void,
} & RequestType;
