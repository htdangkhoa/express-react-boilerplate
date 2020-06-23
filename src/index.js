(async () => {
  let port = parseFloat(process.env.PORT || 8080);

  if (process.env.NODE_ENV !== 'production') {
    const { default: portChecker } = await import('tcp-port-used');

    let isUsed = true;

    while (isUsed) {
      /* eslint-disable no-await-in-loop */
      isUsed = await portChecker.check(port);

      port += 1;
    }
  }

  process.env.PORT = port;

  await import('./ready');
})();
