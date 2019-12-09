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
  .usage('<dir>')
  .parse(process.argv);

const main = () => {
  const dir = commander.args.shift() || '.';

  rimraf.sync(dir);

  gitClone(TEMPLATE_DIR, dir, (error) => {
    if (error) {
      console.error(error);

      process.exit(1);

      return;
    }

    rimraf.sync(`${dir}/bin`);

    const newPackage = omit(packageJson, [
      'author',
      'contributors',
      'homepage',
      'bugs',
      'repository',
      'keywords',
      'bin',
    ]);

    writeFileSync(
      `${dir}/package.json`,
      JSON.stringify(newPackage, null, 2),
      'utf8',
    );
  });
};

main();
