import dayjs from 'dayjs';
import color from 'cli-color';
import pkg from '../package.json';

const mapping = {
  assert: color.magenta,
  debug: color.blue,
  error: color.red,
  info: color.green,
  trace: color.cyanBright,
  warn: color.yellow,
};

['assert', 'debug', 'error', 'info', 'trace', 'warn', 'log'].forEach((name) => {
  const method = name === 'log' ? 'info' : name;

  const oldMethod = console[name].bind(console);

  console[name] = (...args) => {
    const getDate = () => `${dayjs().format('DD-MM-YYYY-hh:mm:ss.SSS')}`;

    const fun = mapping[method];

    const pre = `[${pkg.name}] ${getDate()} ${method.toUpperCase()}`;

    oldMethod.apply(console, [`${fun(pre)}`, ...args]);
  };
});
