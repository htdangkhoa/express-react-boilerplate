#!/usr/bin/env node

const commander = require('commander');
const gitClone = require('git-clone');
const rimraf = require('rimraf');
const { writeFileSync } = require('fs');
const { omit } = require('lodash');
const packageJson = require('../package.json');

const TEMPLATE_DIR = 'https://github.com/htdangkhoa/erb.git';

commander
  .name('erb-gen')
  .version(packageJson.version, '-v, --version')
  .option('-d, --dir <type>', `project's directory.`, '.')
  .option('-n, --name <type>', `project's name.`, packageJson.name)
  .parse(process.argv);

const main = () => {
  const { dir, name } = commander.opts();

  console.info(`Initializing project ${name}...`);

  gitClone(TEMPLATE_DIR, dir, (error) => {
    if (error) {
      const dirExisted =
        error.message.replace(`'git clone' failed with status`, '').trim() ===
        '128';

      if (dirExisted) {
        console.error(new Error('directory already exists.'));
      } else {
        console.error(error);
      }

      process.exit(1);

      return;
    }

    [
      `${dir}/bin`,
      `${dir}/static.json`,
      `${dir}/.git/`,
      `${dir}/yarn.lock`,
    ].forEach((p) => {
      rimraf.sync(p);
    });

    const newPackage = omit(packageJson, [
      'author',
      'contributors',
      'homepage',
      'bugs',
      'repository',
      'keywords',
      'bin',
    ]);

    Object.assign(newPackage, {
      version: '1.0.0',
      name,
      description: '',
    });

    writeFileSync(
      `${dir}/package.json`,
      JSON.stringify(newPackage, null, 2),
      'utf8',
    );

    console.info('Done!!!');
  });
};

main();
