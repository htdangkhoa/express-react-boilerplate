/* @flow */
declare var __DEV__: boolean;

declare var __SERVER__: boolean;

declare var __CLIENT__: boolean;

declare var module: {
  hot: {
    accept(path: string, callback: () => void | Promise<void>): void,
  },
};
