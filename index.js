
const { existsSync, writeFileSync } = require('fs');
const { dirname, resolve } = require('path');
const { sync: mkdirp } = require('mkdirp');
const { ESLint } = require('eslint');

const eslint = new ESLint();

function findConfig () {
  let root = resolve(process.cwd());
  while (existsSync(root + '/package.json')) {
    const config = require(root + '/package.json');
    if (config['eslint-formatter-multiple']) {
      return config['eslint-formatter-multiple'];
    }
    root = resolve(root + '/../');
  }
  return null;
}

module.exports = async function (results, args) {
  const root = resolve(process.cwd());
  const config = findConfig();

  if (!config) {
    console.error('Unable to find a package config that has eslint-formatter-multiple. See README');
    return false;
  }

  for (const formatterConfig of config.formatters || []) {
    const formatter = await eslint.loadFormatter(formatterConfig.name);
    const formatterResult = formatter.format(results);
    if (formatterConfig.output === 'console') {
      console.log(formatterResult);
    } else if (formatterConfig.output === 'file') {
      const filePath = resolve(root, formatterConfig.path);
      try {
        mkdirp(dirname(filePath));
        writeFileSync(filePath, formatterResult);
      } catch (ex) {
        console.error('There was a problem writing the output file:\n%s', ex);

        return false;
      }
    }
  }
};
