// @flow
import { type HelmetData } from 'react-helmet';

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
