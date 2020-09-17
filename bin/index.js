#!/usr/bin/env node

const commander = require('commander');
const gitClone = require('git-clone');
const del = require('del');
const { writeFileSync } = require('fs');
const { omit } = require('lodash');
const packageJson = require('../package.json');

const TEMPLATE_DIR = 'https://github.com/htdangkhoa/erb.git';

const NAME = packageJson.name;

commander
  .name('erb-gen')
  .version(packageJson.version, '-v, --version')
  .option('-d, --dir <type>', `project's directory.`, NAME)
  .option('-n, --name <type>', `project's name.`, NAME)
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

    del.sync(
      [
        `${dir}/bin`,
        `${dir}/public/googledb37d62693032295.html`,
        `${dir}/static.json`,
        `${dir}/.git/`,
        `${dir}/yarn.lock`,
        `${dir}/.github/funding.yml`,
      ],
      { force: true },
    );

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
