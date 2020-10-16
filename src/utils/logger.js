import { readFileSync } from 'fs';
import { resolve } from 'path';
import dayjs from 'dayjs';

const pkg = JSON.parse(
  readFileSync(resolve(process.cwd(), 'package.json'), 'utf-8').toString(),
);

const colors = {
  magenta: '\x1b[35m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  warn: '\x1b[33m',
  white: '\x1b[37m',
};

const mapping = {
  assert: colors.magenta,
  debug: colors.blue,
  error: colors.red,
  info: colors.green,
  trace: colors.cyan,
  warn: colors.warn,
};

['assert', 'debug', 'error', 'info', 'trace', 'warn', 'log'].forEach((name) => {
  const method = name === 'log' ? 'info' : name;

  const oldMethod = console[name].bind(console);

  console[name] = (...args) => {
    const getDate = () => `${dayjs().format('DD-MM-YYYY-hh:mm:ss.SSS')}`;

    const color = mapping[method];

    const prefix = `[${pkg.name}] ${getDate()} ${method.toUpperCase()}`;

    oldMethod.apply(console, [
      color,
      prefix,
      ...args.map((arg) => {
        if (arg instanceof Error) throw arg;

        return `${colors.white}${
          typeof arg === 'string' ? arg : JSON.stringify(arg)
        }`;
      }),
    ]);
  };
});
