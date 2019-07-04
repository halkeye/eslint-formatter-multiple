
const { writeFileSync } = require('fs');
const { dirname, resolve } = require('path');
const { sync: mkdirp } = require('mkdirp');
const { CLIEngine } = require('eslint/lib/cli-engine');
const log = require('eslint/lib/shared/logging');

const engine = new CLIEngine();

module.exports = function (results, args) {
  const root = resolve(process.cwd());
  const config = require(`${root}/../package.json`)['eslint-format-all'];

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
