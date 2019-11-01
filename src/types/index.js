// @flow
import { type HelmetData } from 'react-helmet';

export type ResultModelType = {
  code?: number,

  data?: any,

  error?: { message?: string },
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
