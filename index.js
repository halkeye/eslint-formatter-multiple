
const { existsSync, writeFileSync } = require('fs');
const { dirname, resolve } = require('path');
const { sync: mkdirp } = require('mkdirp');
const { CLIEngine } = require('eslint/lib/cli-engine');
const log = require('eslint/lib/shared/logging');

const engine = new CLIEngine();

function findConfig () {
  let root = resolve(process.cwd());
  while (existsSync(root + '/package.json')) {
    const config = require(root + '/package.json');
    if (config['eslint-format-all']) {
      return config['eslint-format-all'];
    }
    root = resolve(root + '/../');
  }
  return null;
}

module.exports = function (results, args) {
  const root = resolve(process.cwd());
  const config = findConfig();

  if (!config) {
    log.error('Unable to find a package config that has eslint-format-all');
    return false;
  }

  for (const formatterConfig of config.formatters || []) {
    const formatter = engine.getFormatter(formatterConfig.name);
    const formatterResult = formatter(results, args);
    if (formatterConfig.output === 'console') {
      console.log(formatterResult);
    } else if (formatterConfig.output === 'file') {
      const filePath = resolve(root, formatterConfig.path);
      try {
        mkdirp(dirname(filePath));
        writeFileSync(filePath, formatterResult);
      } catch (ex) {
        log.error('There was a problem writing the output file:\n%s', ex);

        return false;
      }
    }
  }
};
